import express, { Request, Response } from 'express';
import { getWeather } from './api-calls.js';
import { getTonightsWeatherData } from './lib.js';

export const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const weatherReport = await getWeather();
    const data = getTonightsWeatherData(weatherReport);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});
