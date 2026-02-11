import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

      const response = await openai.chat.completions.create({
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

  return httpServer;
}
