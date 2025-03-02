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
      },

      // Broken mood quotes
      {
        text: "Allah will not change the condition of a people until they change what is in themselves.",
        source: "Quran 13:11",
        mood: "broken",
        type: "quran"
      },
      {
        text: "He knows what is within the heavens and earth and knows what you conceal and what you declare. And Allah is Knowing of that within the breasts.",
        source: "Quran 64:4",
        mood: "broken",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Allah is more pleased with the repentance of His servant than a person who lost his camel in a desert land and then found it unexpectedly.'",
        source: "Sahih Muslim",
        mood: "broken",
        type: "hadith"
      },
      {
        text: "And when adversity touches you at sea, lost are [all] those you invoke except for Him. But when He delivers you to the land, you turn away. And ever is man ungrateful.",
        source: "Quran 17:67",
        mood: "broken",
        type: "quran"
      },
      {
        text: "The wound which causes you pain right now will be the reason for your strength tomorrow. Be grateful for everything.",
        source: "Islamic Quote",
        mood: "broken",
        type: "quote"
      },

      // Hopeless mood quotes
      {
        text: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.",
        source: "Quran 39:53",
        mood: "hopeless",
        type: "quran"
      },
      {
        text: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah.'",
        source: "Quran 39:53",
        mood: "hopeless",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Do not wish for death, and do not ask for it before it comes to you. If one of you has to wish for death, let him say: O Allah, grant me life as long as life is good for me, and cause me to die when death is good for me.'",
        source: "Sahih Bukhari",
        mood: "hopeless",
        type: "hadith"
      },
      {
        text: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.",
        source: "Quran 2:155",
        mood: "hopeless",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Make things easy and do not make them difficult, cheer the people up by conveying glad tidings to them, and do not repulse them.'",
        source: "Sahih Bukhari",
        mood: "hopeless",
        type: "hadith"
      },

      // Failed mood quotes
      {
        text: "Perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you. And Allah knows, while you know not.",
        source: "Quran 2:216",
        mood: "failed",
        type: "quran"
      },
      {
        text: "But perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you. And Allah Knows, while you know not.",
        source: "Quran 2:216",
        mood: "failed",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'There is no Muslim who is stricken with a calamity and says what Allah has enjoined – 'Verily, to Allah we belong and unto Him is our return. O Allah, reward me for my affliction and compensate me with something better' – but Allah will compensate him with something better.'",
        source: "Sahih Muslim",
        mood: "failed",
        type: "hadith"
      },
      {
        text: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.",
        source: "Quran 3:139",
        mood: "failed",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'When Allah intends good for a person, He afflicts him with trials.'",
        source: "Bukhari",
        mood: "failed",
        type: "hadith"
      },

      // Want to help mood quotes
      {
        text: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
        source: "Quran 5:2",
        mood: "want_to_help",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter.'",
        source: "Sahih Muslim",
        mood: "want_to_help",
        type: "hadith"
      },
      {
        text: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.",
        source: "Quran 49:10",
        mood: "want_to_help",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'The believers in their mutual kindness, compassion and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever.'",
        source: "Sahih Bukhari",
        mood: "want_to_help",
        type: "hadith"
      },
      {
        text: "And whoever saves one - it is as if he had saved mankind entirely.",
        source: "Quran 5:32",
        mood: "want_to_help",
        type: "quran"
      },

      // Overthinking mood quotes
      {
        text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
        source: "Quran 2:152",
        mood: "overthinking",
        type: "quran"
      },
      {
        text: "Those who believe and whose hearts find rest in the remembrance of Allah, Verily, in the remembrance of Allah do hearts find rest.",
        source: "Quran 13:28",
        mood: "overthinking",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Look at those who are beneath you and do not look at those who are above you, for it is more suitable that you do not undervalue the blessing of Allah.'",
        source: "Sahih Bukhari",
        mood: "overthinking",
        type: "hadith"
      },
      {
        text: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you.",
        source: "Quran 49:13",
        mood: "overthinking",
        type: "quran"
      },
      {
        text: "The Prophet (ﷺ) said: 'Part of the perfection of a person's Islam is his leaving that which does not concern him.'",
        source: "Tirmidhi",
        mood: "overthinking",
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

export function getQuotesByMood(mood: string) {
  return allQuotes.filter((quote) => quote.mood === mood);
}

export function getAllMoods() {
  return moods;
}