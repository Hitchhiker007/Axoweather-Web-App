"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = getRedis;
const ioredis_1 = require("ioredis");
// import v2 firebase functions parameter helper
const params_1 = require("firebase-functions/params");
// firebase functions v2 instead of using env variables via functions.config()
// we define typed parameters that are deployed along with the function
const REDIS_URL = (0, params_1.defineString)('REDIS_URL');
// use single Redis client instance per function instance to avoid 
// creating too many connections which could exhaust resources
let redisClient = null;
// Lazy initialization of Redis
function getRedis() {
    if (!redisClient) {
        // access the v2 param value at runtime using .value
        const redisUrl = REDIS_URL.value();
        redisClient = new ioredis_1.Redis(redisUrl); // initialize Redis client with the URL
        redisClient.on('error', (err) => {
            console.error("Redis connection error:", err);
        });
    }
    return redisClient;
}
