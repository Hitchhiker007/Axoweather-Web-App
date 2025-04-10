import { redis } from "./redis";

export async function fetchWeatherServer(location: string) {
    const apiKey = '8B5AUC54ASZU7H9VCRMU3M4AM';
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const url = `${baseUrl}${location}?unitGroup=us&key=${apiKey}&contentType=json`;
  
    if (location === "") return null;

    try {
        const cachedValue = await redis.get(location);
        if (cachedValue) return JSON.parse(cachedValue);
    
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error('Network error');
    
        const data = await response.json();
        await redis.set(location, JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Server fetch error:", error);
        return null;
      }
    }