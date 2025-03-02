
interface Hadith {
  id: number;
  text: string;
  source: string;
}

// Collection of authentic hadith from various sources
const hadiths: Hadith[] = [
  {
    id: 1,
    text: "Actions are judged by intentions, so each man will have what he intended.",
    source: "Sahih al-Bukhari 1, Sahih Muslim 1907"
  },
  {
    id: 2,
    text: "The best of you are those who are best to their families, and I am the best of you to my family.",
    source: "Sunan al-Tirmidhi 3895"
  },
  {
    id: 3,
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih al-Bukhari 13, Sahih Muslim 45"
  },
  {
    id: 4,
    text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    source: "Sahih al-Bukhari 6018, Sahih Muslim 47"
  },
  {
    id: 5,
    text: "A Muslim is the one from whose tongue and hands the Muslims are safe.",
    source: "Sahih al-Bukhari 10"
  },
  {
    id: 6,
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    source: "Sahih al-Bukhari 6114"
  },
  {
    id: 7,
    text: "Whoever removes a worldly hardship from a believer, Allah will remove one of the hardships of the Day of Resurrection from him.",
    source: "Sahih Muslim 2699"
  },
  {
    id: 8,
    text: "Smiling in your brother's face is an act of charity.",
    source: "Sunan al-Tirmidhi 1956"
  },
  {
    id: 9,
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    source: "Sahih al-Bukhari 6464, Sahih Muslim 782"
  },
  {
    id: 10,
    text: "The best of you are those who learn the Quran and teach it.",
    source: "Sahih al-Bukhari 5027"
  },
  {
    id: 11,
    text: "The believer is not stung from the same hole twice.",
    source: "Sahih al-Bukhari 6133, Sahih Muslim 2998"
  },
  {
    id: 12,
    text: "Make things easy and do not make them difficult, cheer people up and do not drive them away.",
    source: "Sahih al-Bukhari 69, Sahih Muslim 1734"
  },
  {
    id: 13,
    text: "Whoever does not show mercy to our young ones and does not acknowledge the rights of our elders is not one of us.",
    source: "Sunan Abu Dawud 4943"
  },
  {
    id: 14,
    text: "Cleanliness is half of faith.",
    source: "Sahih Muslim 223"
  },
  {
    id: 15,
    text: "The best form of charity is that given by a person who has little.",
    source: "Sunan Abu Dawud 1677"
  },
  {
    id: 16,
    text: "Be mindful of Allah, and Allah will protect you. Be mindful of Allah, and you will find Him in front of you.",
    source: "40 Hadith Nawawi 19"
  },
  {
    id: 17,
    text: "The most complete of believers in faith are those who are best in character, and the best of you are those who are best to their women.",
    source: "Sunan al-Tirmidhi 1162"
  },
  {
    id: 18,
    text: "There is nothing heavier in the scales of a believing servant on the Day of Resurrection than good character.",
    source: "Sunan al-Tirmidhi 2002"
  },
  {
    id: 19,
    text: "A good word is charity.",
    source: "Sahih al-Bukhari 2989, Sahih Muslim 1009"
  },
  {
    id: 20,
    text: "Do not belittle any good deed, even meeting your brother with a cheerful face.",
    source: "Sahih Muslim 2626"
  },
  {
    id: 21,
    text: "The merciful are shown mercy by the Most Merciful. Be merciful to those on earth, and the One in the heavens will be merciful to you.",
    source: "Sunan al-Tirmidhi 1924"
  },
  {
    id: 22,
    text: "The most excellent jihad is that for the conquest of self.",
    source: "Sunan Abu Dawud 2519"
  },
  {
    id: 23,
    text: "He who is not grateful to the people is not grateful to Allah.",
    source: "Sunan Abu Dawud 4811"
  },
  {
    id: 24,
    text: "Allah is not merciful to those who are not merciful to people.",
    source: "Sahih al-Bukhari 7376"
  },
  {
    id: 25,
    text: "Seek knowledge from the cradle to the grave.",
    source: "Al-Bayhaqi"
  },
  {
    id: 26,
    text: "Every religion has a chief characteristic and the chief characteristic of Islam is modesty.",
    source: "Abu Dawud"
  },
  {
    id: 27,
    text: "Richness is not having many possessions. Rather, true richness is the richness of the soul.",
    source: "Sahih al-Bukhari 6446"
  },
  {
    id: 28,
    text: "Verily, Allah does not look at your appearance or wealth, but rather He looks at your hearts and your deeds.",
    source: "Sahih Muslim 2564"
  },
  {
    id: 29,
    text: "A kind word is a form of charity.",
    source: "Sahih Muslim 1009"
  },
  {
    id: 30,
    text: "The best of people are those most beneficial to people.",
    source: "Al-Mu'jam Al-Awsat 5787"
  }
];

// Track previously served hadiths to avoid repetition
let lastServedHadiths = new Set<number>();

export function getRandomHadith(): Hadith {
  // If we've served most of the hadiths, reset the tracker
  if (lastServedHadiths.size > hadiths.length * 0.7) {
    lastServedHadiths.clear();
  }
  
  // Filter out recently served hadiths
  const availableHadiths = hadiths.filter(h => !lastServedHadiths.has(h.id));
  
  // If somehow all hadiths have been served recently, just pick any random one
  const hadithPool = availableHadiths.length > 0 ? availableHadiths : hadiths;
  
  // Select a random hadith
  const randomIndex = Math.floor(Math.random() * hadithPool.length);
  const selectedHadith = hadithPool[randomIndex];
  
  // Track this hadith as served
  lastServedHadiths.add(selectedHadith.id);
  
  return selectedHadith;
}
