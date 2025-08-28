import { getRedis } from './redis';

// Server Side Redis Logic

export async function fetchWeatherServer(location: string) {
    const apiKey = '8B5AUC54ASZU7H9VCRMU3M4AM';
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const url = `${baseUrl}${location}?unitGroup=us&key=${apiKey}&contentType=json`;
  
    if (location === "") return null;

    try {
        // initialize redis at runtime using v2 param
        const redis = getRedis();

        // first see if the key "location" is cached in redis
        // if value exists return parsed JSON weather data immediatly, no API call needed
        const cachedValue = await redis.get(location);
        if (cachedValue) return JSON.parse(cachedValue);        
        // if there is no cache for the location
        // make a get request to the weather API
        // If not cached, fetch from API
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
         
        // parse the json response and save new data to redis cache using set() method,
        // set data stored in cache to expire in 12 hours, return new data
        const data = await response.json();
        await redis.set(location, JSON.stringify(data), 'EX', 43200);
        return data;
      } catch (error) {
        // usually redis issue or fetch error
        console.error("Server fetch error:", error);
        return null;
      }
    }