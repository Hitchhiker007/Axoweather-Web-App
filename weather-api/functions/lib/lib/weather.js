"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherServer = fetchWeatherServer;
const redis_1 = require("./redis");
// Server Side Redis Logic
async function fetchWeatherServer(location) {
    const apiKey = '8B5AUC54ASZU7H9VCRMU3M4AM';
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const url = `${baseUrl}${location}?unitGroup=us&key=${apiKey}&contentType=json`;
    if (location === "")
        return null;
    // Try to get cached value from Redis, but don't crash if Redis is unavailable
    let cachedValue = null;
    try {
        // Lazily initialize Redis at runtime
        const redis = (0, redis_1.getRedis)();
        // First see if the key "location" is cached in Redis
        // If value exists, return parsed JSON weather data immediately, no API call needed
        cachedValue = await redis.get(location);
    }
    catch (error) {
        console.error("Redis unavailable, skipping cache:", error);
    }
    if (cachedValue)
        return JSON.parse(cachedValue);
    // If Redis missed or failed, fetch from API regardless
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Network error");
        // Parse the JSON response
        const data = await response.json();
        // Try to save new data to Redis cache using set() method
        // Set data stored in cache to expire in 12 hours
        // If Redis fails here, skip caching but still return data
        try {
            const redis = (0, redis_1.getRedis)();
            await redis.set(location, JSON.stringify(data), 'EX', 43200);
        }
        catch (error) {
            console.error("Redis write failed, skipping cache:", error);
        }
        return data;
    }
    catch (error) {
        // Usually a fetch/network error
        console.error("Weather API fetch error:", error);
        return null;
    }
}
