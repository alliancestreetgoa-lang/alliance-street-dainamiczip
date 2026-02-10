import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

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

  return httpServer;
}
