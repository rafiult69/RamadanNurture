
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Hadith {
  text: string;
  source: string;
}

export function RandomHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomHadith = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/hadith/random");
      const data = await response.json();
      setHadith(data);
    } catch (error) {
      console.error("Error fetching hadith:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomHadith();
    
    // Set up interval to change hadith every 30 seconds
    const interval = setInterval(() => {
      fetchRandomHadith();
    }, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && !hadith) {
    return (
      <Card className="shadow-md border-t-4 border-t-green-600">
        <CardContent className="pt-6 p-4">
          <div className="flex items-center justify-center h-24">
            Loading hadith...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-t-4 border-t-green-600 overflow-hidden">
      <CardContent className="pt-6 p-4">
        <h3 className="text-xl font-semibold mb-3 text-green-800">Hadith of the Moment</h3>
        <div className="text-right mb-4">
          <span className="text-lg font-arabic text-green-700" style={{ fontFamily: 'Noto Naskh Arabic' }}>
            ❝
          </span>
        </div>
        <p className="text-lg mb-2 text-gray-800">{hadith?.text}</p>
        <p className="text-sm text-green-700 font-semibold">{hadith?.source}</p>
        <div className="text-left mt-2">
          <span className="text-lg font-arabic text-green-700" style={{ fontFamily: 'Noto Naskh Arabic' }}>
            ❞
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
