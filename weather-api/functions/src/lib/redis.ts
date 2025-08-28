import { Redis } from "ioredis";
// import v2 firebase functions parameter helper
import { defineString } from "firebase-functions/params";

// firebase functions v2 instead of using env variables via functions.config()
// we define typed parameters that are deployed along with the function
const REDIS_URL = defineString('REDIS_URL');

// use single Redis client instance per function instance to avoid 
// creating too many connections which could exhaust resources
let redisClient: Redis | null = null;

// Lazy initialization of Redis
export function getRedis(): Redis {
  if (!redisClient) {
     // access the v2 param value at runtime using .value
    const redisUrl = REDIS_URL.value();
    redisClient = new Redis(redisUrl); // initialize Redis client with the URL
  }
  return redisClient;
}