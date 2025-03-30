import React, { useEffect, useState } from "react";


const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMelbourneWeather = async () => {
      const apiKey = "8B5AUC54ASZU7H9VCRMU3M4AM";
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Melbourne?unitGroup=metric&key=${apiKey}&contentType=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response not ok.");
        
        const data = await response.json();
        setWeather({
          temp: Math.round(data.currentConditions.temp),
          condition: data.currentConditions.conditions,
        });
      } catch (error) {
        console.error("Error fetching Melbourne weather:", error);
      }
    };             

    fetchMelbourneWeather();
  }, []);

  return (
    <div className="flex items-top gap-8"> {/* Align items in a row */}
    {/* Left side: Time and Date */}
    <div className="flex flex-col text-right"> {/* Align text to the right */}
      <p>Melbourne</p>
      <p>{time.toLocaleDateString()}</p>
      <p>{time.toLocaleTimeString()}</p>
    </div>

    {/* Right side: Weather */}
    {weather && (
      <div className="flex flex-col">
        <p>Weather</p>
        <p>{weather.temp}°C - {weather.condition}</p>
      </div>
    )}
  </div>
  );
};

export default TimeDisplay;
