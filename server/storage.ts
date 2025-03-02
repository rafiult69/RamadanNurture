import { quotes, type Quote, type InsertQuote, type Mood } from "@shared/schema";

export interface IStorage {
  getQuotes(): Promise<Quote[]>;
  getQuotesByMood(mood: Mood): Promise<Quote[]>;
  getRandomQuotesByMood(mood: Mood, count: number): Promise<Quote[]>;
  addQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private quotes: Map<number, Quote>;
  private currentId: number;

  constructor() {
    this.quotes = new Map();
    this.currentId = 1;
    this.initializeQuotes();
  }

  private initializeQuotes() {
    const initialQuotes: InsertQuote[] = [
      {
        text: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient",
        source: "Quran 2:155",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
        source: "Quran 94:5-6",
        mood: "sad",
        type: "quran"
      },
      {
        text: "Do not lose hope, nor be sad. You will surely be victorious if you are true believers",
        source: "Quran 3:139",
        mood: "sad",
        type: "quran"
      }
    ];

    initialQuotes.forEach(quote => this.addQuote(quote));
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuotesByMood(mood: Mood): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(
      quote => quote.mood === mood
    );
  }

  async getRandomQuotesByMood(mood: Mood, count: number): Promise<Quote[]> {
    const moodQuotes = await this.getQuotesByMood(mood);
    const shuffled = [...moodQuotes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  async addQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentId++;
    const quote = { id, ...insertQuote };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();