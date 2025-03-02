
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
  private lastServedQuotes: Map<Mood, Set<number>>;

  constructor() {
    this.quotes = new Map();
    this.currentId = 1;
    this.lastServedQuotes = new Map();
    moods.forEach(mood => {
      this.lastServedQuotes.set(mood, new Set());
    });
    this.initializeQuotes();
  }

  private initializeQuotes() {
    const initialQuotes: InsertQuote[] = [
      // Sad mood quotes
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
      },
      {
        text: "Indeed, with hardship [will be] ease",
        source: "Quran 94:6",
        mood: "sad",
        type: "quran"
      },
      {
        text: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient",
        source: "Quran 2:155",
        mood: "sad",
        type: "quran"
      },
      {
        text: "Verily, along with every hardship is relief.",
        source: "Quran 94:5",
        mood: "sad",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Amazing is the affair of the believer, verily all of his affair is good, and this is not for no one except the believer. If something of good befalls him he is grateful and that is good for him. If something of harm befalls him he is patient and that is good for him.'",
        source: "Sahih Muslim",
        mood: "sad",
        type: "hadith"
      },

      // Anxious mood quotes
      {
        text: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah]",
        source: "Quran 2:45",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient",
        source: "Quran 2:153",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "Allah does not burden a soul beyond that it can bear",
        source: "Quran 2:286",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "And We have already created man and know what his soul whispers to him, and We are closer to him than [his] jugular vein",
        source: "Quran 50:16",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "No person shall have a burden laid on them greater than they can bear.",
        source: "Quran 2:233",
        mood: "anxious",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'There is no disease that Allah has created, except that He also has created its treatment.'",
        source: "Sahih Bukhari",
        mood: "anxious",
        type: "hadith"
      },

      // Grateful mood quotes
      {
        text: "And if you should count the favors of Allah, you could not enumerate them",
        source: "Quran 14:34",
        mood: "grateful",
        type: "quran"
      },
      {
        text: "And He found you lost and guided [you]",
        source: "Quran 93:7",
        mood: "grateful",
        type: "quran"
      },
      {
        text: "And whoever is grateful - his gratitude is only for [the benefit of] himself",
        source: "Quran 31:12",
        mood: "grateful",
        type: "quran"
      },
      {
        text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me",
        source: "Quran 2:152",
        mood: "grateful",
        type: "quran"
      },
      {
        text: "Therefore remember Me, I will remember you. Give thanks to Me, and reject not Faith.",
        source: "Quran 2:152",
        mood: "grateful",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'He who does not thank people does not thank Allah.'",
        source: "Sunan Abu Dawud",
        mood: "grateful",
        type: "hadith"
      },

      // Hopeful mood quotes
      {
        text: "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me",
        source: "Quran 2:186",
        mood: "hopeful",
        type: "quran"
      },
      {
        text: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah'",
        source: "Quran 39:53",
        mood: "hopeful",
        type: "quran"
      },
      {
        text: "Indeed, Allah will not change the condition of a people until they change what is in themselves",
        source: "Quran 13:11",
        mood: "hopeful",
        type: "quran"
      },
      {
        text: "And your Lord says, 'Call upon Me; I will respond to you.'",
        source: "Quran 40:60",
        mood: "hopeful",
        type: "quran"
      },
      {
        text: "Indeed, with hardship will be ease. So when you have finished [your duties], then stand up [for worship]. And to your Lord direct [your] longing.",
        source: "Quran 94:6-8",
        mood: "hopeful",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Allah says: I am as My servant thinks of Me, and I am with him when he remembers Me.'",
        source: "Sahih Bukhari",
        mood: "hopeful",
        type: "hadith"
      },

      // Seeking guidance mood quotes
      {
        text: "My Lord, increase me in knowledge",
        source: "Quran 20:114",
        mood: "seeking_guidance",
        type: "quran"
      },
      {
        text: "And your Lord says, 'Call upon Me; I will respond to you.'",
        source: "Quran 40:60",
        mood: "seeking_guidance",
        type: "quran"
      },
      {
        text: "Guide us to the straight path",
        source: "Quran 1:6",
        mood: "seeking_guidance",
        type: "quran"
      },
      {
        text: "That is Allah, your Lord; there is no deity except Him, the Creator of all things, so worship Him. And He is Disposer of all things.",
        source: "Quran 6:102",
        mood: "seeking_guidance",
        type: "quran"
      },
      {
        text: "And those who strive for Us - We will surely guide them to Our ways. And indeed, Allah is with the doers of good.",
        source: "Quran 29:69",
        mood: "seeking_guidance",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.'",
        source: "Sahih Muslim",
        mood: "seeking_guidance",
        type: "hadith"
      },

      // Peaceful mood quotes
      {
        text: "Those who believe and whose hearts find rest in the remembrance of Allah, Verily, in the remembrance of Allah do hearts find rest",
        source: "Quran 13:28",
        mood: "peaceful",
        type: "quran"
      },
      {
        text: "Allah is with those who have patience",
        source: "Quran 2:153",
        mood: "peaceful",
        type: "quran"
      },
      {
        text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me",
        source: "Quran 2:152",
        mood: "peaceful",
        type: "quran"
      },
      {
        text: "Peace - a word from a Merciful Lord.",
        source: "Quran 36:58",
        mood: "peaceful",
        type: "quran"
      },
      {
        text: "So be patient. Indeed, the promise of Allah is truth.",
        source: "Quran 30:60",
        mood: "peaceful",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.'",
        source: "Sahih Bukhari",
        mood: "peaceful",
        type: "hadith"
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
    
    // If we don't have enough quotes, just return what we have
    if (moodQuotes.length <= count) {
      return moodQuotes;
    }
    
    // Get the set of recently served quotes for this mood
    const recentlyServed = this.lastServedQuotes.get(mood) || new Set();
    
    // Filter out recently served quotes if possible
    let availableQuotes = moodQuotes.filter(quote => !recentlyServed.has(quote.id));
    
    // If we filtered out too many, just use all quotes
    if (availableQuotes.length < count) {
      availableQuotes = moodQuotes;
      // Reset the recently served set
      recentlyServed.clear();
    }
    
    // Shuffle available quotes
    const shuffled = [...availableQuotes].sort(() => Math.random() - 0.5);
    const selectedQuotes = shuffled.slice(0, count);
    
    // Update recently served quotes
    selectedQuotes.forEach(quote => recentlyServed.add(quote.id));
    this.lastServedQuotes.set(mood, recentlyServed);
    
    return selectedQuotes;
  }

  async addQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentId++;
    const quote = { id, ...insertQuote };
    this.quotes.set(id, quote);
    return quote;
  }
}

// Import moods from schema to use in the constructor
import { moods } from "@shared/schema";

export const storage = new MemStorage();
