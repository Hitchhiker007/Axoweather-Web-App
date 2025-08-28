import { onRequest } from 'firebase-functions/v2/https';
import { fetchWeatherServer } from './lib/weather';
import 'dotenv/config'; // automatically loads .env into process.env

export const weatherAus = onRequest({ region: 'australia-southeast1' }, async (req, res)  => {
  try {
    const { location } = req.body;
    if (!location) {
      res.status(400).send('Missing location');
      return;
    }

    const data = await fetchWeatherServer(location);
    res.status(200).json(data); 
  } catch (err) {
    console.error('Weather function error:', err);
    res.status(500).send('Server error');
  }
});

