import * as functions from 'firebase-functions';
import { fetchWeatherServer } from './lib/weather';

export const weather = functions.https.onRequest(async (req, res) => {
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

