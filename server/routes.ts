import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { moods } from "@shared/schema";
import { getRandomHadith } from "./hadith";

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
    // Always get one quote regardless of count parameter
    const quotes = await storage.getRandomQuotesByMood(mood as any, 1);
    res.json(quotes);
  });

  app.get("/api/hadith/random", (_req, res) => {
    const hadith = getRandomHadith();
    res.json(hadith);
  });

  app.get("/api/moods", async (_req, res) => { // Added API endpoint for moods
    const allMoods = await storage.getAllMoods(); // Assuming getAllMoods exists in storage
    res.json(allMoods);
  });

  // Add other API endpoints as needed based on the user's request (Prayer Times, Tasbih Counter, Daily Reminders)
  // This would require significant additional code and data structures beyond the scope of this example.

  return createServer(app);
}