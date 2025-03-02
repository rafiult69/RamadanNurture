
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
  }
];

export function getRandomHadith(): Hadith {
  const randomIndex = Math.floor(Math.random() * hadiths.length);
  return hadiths[randomIndex];
}
