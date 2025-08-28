"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = getRedis;
const ioredis_1 = require("ioredis");
const params_1 = require("firebase-functions/params");
// Define the 2nd-gen function parameter
const REDIS_URL = (0, params_1.defineString)('REDIS_URL');
let redisClient = null;
// Lazy initialization of Redis
function getRedis() {
    if (!redisClient) {
        const redisUrl = REDIS_URL.value(); // get value at runtime
        redisClient = new ioredis_1.Redis(redisUrl);
    }
    return redisClient;
}
