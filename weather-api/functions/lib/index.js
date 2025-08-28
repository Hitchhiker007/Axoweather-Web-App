"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherAus = void 0;
const https_1 = require("firebase-functions/v2/https");
const weather_1 = require("./lib/weather");
require("dotenv/config"); // automatically loads .env into process.env
exports.weatherAus = (0, https_1.onRequest)({ region: 'australia-southeast1' }, async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            res.status(400).send('Missing location');
            return;
        }
        const data = await (0, weather_1.fetchWeatherServer)(location);
        res.status(200).json(data);
    }
    catch (err) {
        console.error('Weather function error:', err);
        res.status(500).send('Server error');
    }
});
