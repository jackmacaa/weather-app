import { combineDateAndTemperatureData, getMinOrMaxTemperature, getRecommendedClothes, getTempDataNightTime } from './lib.js'
import express, { Request, Response } from 'express'
import { getWeather } from './api-calls.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    const weatherReport = await getWeather()

    const dateAndTemperatureData = combineDateAndTemperatureData(weatherReport.hourly.time, weatherReport.hourly.temperature_2m)

    const nightTimeData = getTempDataNightTime(dateAndTemperatureData)

    const minTemperature = getMinOrMaxTemperature(nightTimeData, 'MIN')

    const maxTemperature = getMinOrMaxTemperature(nightTimeData, 'MAX')

    const recommendedClothes = getRecommendedClothes(minTemperature.temperature, maxTemperature.temperature)

    return res.status(200).json({
        recommendedClothes,
        minTemperature: minTemperature.temperature,
        maxTemperature: maxTemperature.temperature
    })
})

app.listen(3000, () => {
    console.log(`Server http://localhost:3000`);
});