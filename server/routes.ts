import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { moods } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/quotes", async (_req, res) => {
    const quotes = await storage.getQuotes();
    res.json(quotes);
  });

  app.get("/api/quotes/:mood", async (req, res) => {
    const mood = req.params.mood;
    if (!moods.includes(mood as any)) {
      res.status(400).json({ message: "Invalid mood" });
      return;
    }
    const quotes = await storage.getQuotesByMood(mood as any);
    res.json(quotes);
  });

  return createServer(app);
}
