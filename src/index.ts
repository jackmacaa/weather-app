import axios from 'axios'
import { WeatherApiResponse } from './types/index.js'

const weatherApi = 'https://api.open-meteo.com/v1/bom'
const elizabethParkCoords = 'latitude=-34.71&longitude=138.68'

const url = `${weatherApi}?${elizabethParkCoords}&hourly=temperature_2m&timeformat=unixtime&timezone=Australia%2FSydney&forecast_days=2`

const getWeather = async (url: string) => {
    const response = await axios.get<WeatherApiResponse>(url)

    return response
}

// const convertUnixTimeToReadible = (times: number[]): string[] => {
//     return times.map((time) => time.)
// }

const {data} = await getWeather(url)
console.log(data)

const date = new Date(data.hourly.time[0] * 1000)

console.log(date)