import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  mood: varchar("mood", { length: 50 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'quran' or 'hadith'
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  text: true,
  source: true,
  mood: true,
  type: true,
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

export const moods = [
  "sad",
  "anxious",
  "grateful",
  "hopeful",
  "seeking_guidance",
  "peaceful",
  "broken",
  "hopeless",
  "failed",
  "want_to_help",
  "overthinking",
] as const;

export type Mood = typeof moods[number];

export interface TimingLocation {
  city: string;
  sehri: string;
  iftar: string;
}
