import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { moods, type Mood } from "@shared/schema";
import { ramadanTimings } from "@/data/timings";
import { Moon, Sun, Clock } from "lucide-react";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood>("peaceful");

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["/api/quotes", selectedMood],
    enabled: !!selectedMood,
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero Section with Islamic Pattern */}
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524945054674-362051610bd0')`,
          backgroundColor: 'rgba(0, 100, 0, 0.8)',
          backgroundBlend: 'overlay'
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
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">How are you feeling?</h2>
            <RadioGroup
              value={selectedMood}
              onValueChange={(value) => setSelectedMood(value as Mood)}
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
                quotes?.map((quote) => (
                  <Card key={quote.id} className="mb-4">
                    <CardContent className="pt-6">
                      <p className="text-lg mb-2">{quote.text}</p>
                      <p className="text-sm text-green-700">{quote.source}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </Card>

          {/* Ramadan Timings Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              Ramadan Timings
            </h2>
            <div className="space-y-4">
              {ramadanTimings.map((timing) => (
                <Card key={timing.city}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{timing.city}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Sehri: {timing.sehri}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Iftar: {timing.iftar}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
