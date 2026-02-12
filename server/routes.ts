import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogPostSchema, insertPageContentSchema, insertSiteSettingSchema } from "@shared/schema";
import OpenAI from "openai";
import bcrypt from "bcrypt";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

const SYSTEM_PROMPT = `You are a friendly and professional customer support assistant for Alliance Street Accounting, a global accounting and outsourcing firm offering services up to Virtual CFO level.

About the company:
- Alliance Street Accounting provides accounting, bookkeeping, tax compliance, payroll processing, financial reporting, virtual CFO services, and back-office support.
- We serve businesses in the United States, United Kingdom, European Union, UAE, Canada, and India.
- Contact: Phone +91 7375096163, Email shaukin@alliancestreet.ae
- Business hours: Monday-Friday, 11:00 AM - 10:00 PM (IST)
- Website: alliancestreetaccounting.com

Services offered:
1. Accounting & Bookkeeping - Daily transaction recording, reconciliation, accounts payable/receivable
2. Tax Compliance - Multi-jurisdiction tax filing, VAT/GST returns, corporate tax
3. Payroll Processing - End-to-end payroll management, statutory compliance
4. Financial Reporting - Monthly/quarterly reports, dashboards, variance analysis
5. Virtual CFO - Strategic financial planning, budgeting, cash flow management, investor relations
6. Back-Office Support - Data entry, document management, process automation

Regional expertise:
- US: GAAP compliant accounting across all 50 states
- UK: HMRC regulations, VAT returns, UK corporate tax
- EU: Cross-border VAT, country-specific compliance
- UAE: Free Zone and Mainland companies, Corporate Tax
- Canada: CRA compliance, GST/HST filing, Canadian payroll
- India: Cost-effective delivery with deep expertise in global standards

Guidelines:
- Be concise, helpful, and professional
- If asked about pricing, say that pricing varies based on business size and needs, and encourage them to reach out for a custom quote
- For complex queries, suggest scheduling a consultation via the contact page or email
- Keep responses under 150 words unless more detail is specifically requested
- Never make up information about the company that isn't provided above`;

function requireAuth(req: any, res: any, next: any) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============ PUBLIC ROUTES ============

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.flatten() });
      }
      const submission = await storage.createContactSubmission(parsed.data);
      return res.status(201).json({ message: "Submission received", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Messages array is required" });
      }

      const response = await getOpenAI().chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_completion_tokens: 512,
      });

      const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Chat error:", error);
      if (error?.status === 401) {
        return res.status(500).json({ message: "AI service is not configured. Please contact support." });
      }
      return res.status(500).json({ message: "Failed to get a response. Please try again." });
    }
  });

  app.get("/api/content/:page", async (req, res) => {
    try {
      const contents = await storage.getPageContents(req.params.page);
      const result: Record<string, any> = {};
      for (const c of contents) {
        result[c.sectionKey] = c.content;
      }
      return res.json(result);
    } catch (error) {
      console.error("Content fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      return res.json(posts);
    } catch (error) {
      console.error("Blog fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.published) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    } catch (error) {
      console.error("Blog post fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      const result: Record<string, string> = {};
      for (const s of settings) {
        result[s.key] = s.value;
      }
      return res.json(result);
    } catch (error) {
      console.error("Settings fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============ AUTH ROUTES ============

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      (req as any).session.userId = user.id;
      return res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    (req as any).session.destroy();
    return res.json({ message: "Logged out" });
  });

  app.get("/api/admin/me", async (req, res) => {
    if (!(req as any).session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser((req as any).session.userId);
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    return res.json({ id: user.id, username: user.username });
  });

  // ============ ADMIN ROUTES ============

  app.get("/api/admin/content", requireAuth, async (req, res) => {
    try {
      const contents = await storage.getAllPageContents();
      return res.json(contents);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/admin/content", requireAuth, async (req, res) => {
    try {
      const parsed = insertPageContentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      }
      const content = await storage.upsertPageContent(parsed.data);
      return res.json(content);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      }
      const post = await storage.createBlogPost(parsed.data);
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.updateBlogPost(id, req.body);
      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) return res.status(404).json({ message: "Post not found" });
      return res.json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/settings", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      return res.json(settings);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/admin/settings", requireAuth, async (req, res) => {
    try {
      const parsed = insertSiteSettingSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      }
      const setting = await storage.upsertSiteSetting(parsed.data);
      return res.json(setting);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
