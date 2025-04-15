import {Redis} from "ioredis";
import * as functions from "firebase-functions";

const getRedisUrl = () => {
    // for local development
    // if (process.env.REDIS_URL) {
    //     return process.env.REDIS_URL
    // }

    const redisUrl = functions.config().redis?.url;
    if (!redisUrl) {
        throw new Error("REDIS_URL is not defined in Firebase functions config");
    }
    return redisUrl;

    // throw new Error('REDIS_URL is not defined')
};

export const redis = new Redis(getRedisUrl())