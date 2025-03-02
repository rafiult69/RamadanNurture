import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { moods, type Mood } from "@shared/schema";
import { ramadanTimings } from "@/data/timings";
import { Moon, Sun, Search } from "lucide-react";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood>("peaceful");
  const [searchCity, setSearchCity] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["/api/quotes/" + selectedMood, { count: 3 }, refreshKey],
    enabled: !!selectedMood,
  });

  const filteredCities = ramadanTimings.filter(timing =>
    timing.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Arabic Calligraphy */}
      <div className="text-center py-4 bg-green-50">
        <p className="text-2xl font-arabic text-green-800" style={{ fontFamily: 'Noto Naskh Arabic' }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      <div 
        className="h-64 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524945054674-362051610bd0')`,
          backgroundColor: 'rgba(0, 100, 0, 0.8)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            Islamic Inspiration for Ramadan
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mood-based Quotes Section */}
          <Card className="p-6 shadow-lg border-t-4 border-t-green-600">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">How are you feeling?</h2>
            <RadioGroup
              value={selectedMood}
              onValueChange={(value) => handleMoodChange(value as Mood)}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {moods.map((mood) => (
                <div key={mood} className="flex items-center space-x-2">
                  <RadioGroupItem value={mood} id={mood} />
                  <Label htmlFor={mood} className="capitalize">
                    {mood.replace('_', ' ')}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <ScrollArea className="h-[400px] rounded-md border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  Loading quotes...
                </div>
              ) : (
                quotes?.map((quote: any) => (
                  <Card key={quote.id} className="mb-4 overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="text-right mb-4">
                        <span className="text-lg font-arabic text-green-700" style={{ fontFamily: 'Noto Naskh Arabic' }}>
                          ❝
                        </span>
                      </div>
                      <p className="text-lg mb-2 text-gray-800">{quote.text}</p>
                      <p className="text-sm text-green-700 font-semibold">{quote.source}</p>
                      <div className="text-left mt-2">
                        <span className="text-lg font-arabic text-green-700" style={{ fontFamily: 'Noto Naskh Arabic' }}>
                          ❞
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </Card>

          {/* Ramadan Timings Section */}
          <Card className="p-6 shadow-lg border-t-4 border-t-green-600">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              Ramadan Timings
            </h2>
            <div className="mb-4 relative">
              <Input
                type="text"
                placeholder="Search city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredCities.map((timing) => (
                  <Card key={timing.city} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 text-green-700">{timing.city}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4 text-green-600" />
                          <span>Sehri: {timing.sehri}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-green-600" />
                          <span>Iftar: {timing.iftar}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>

      {/* Bottom Arabic Calligraphy */}
      <div className="text-center py-4 bg-green-50 mt-8">
        <p className="text-xl font-arabic text-green-800" style={{ fontFamily: 'Noto Naskh Arabic' }}>
          رَمَضَانَ كَرِيم
        </p>
      </div>
    </div>
  );
}