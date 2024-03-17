import axios from 'axios'
import { WeatherApiResponse } from './types/index.js'
import { DateTime } from 'luxon'

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

const combineDateAndTemperatureData = (times: number[], temperatures: number[]) => {
    if (times.length !== temperatures.length) {
        throw new Error('time and temp data not valid')
    }

    return times.map((time, i) => {
        return {
            unixTime: time,
            date: new Date(time * 1000),
            temperature: temperatures[i]
        }
    })
}

const convertDateFormatAndTimezone = (date: Date, timeZone: string) => {
    return DateTime.fromJSDate(date, { zone: timeZone })
}

const { data } = await getWeather(url)
console.log(data)

const date = new Date(data.hourly.time[0] * 1000)

console.log(date)

console.log(convertDateFormatAndTimezone(date, 'Australia/Adelaide'))

const dateAndTemperatureData = combineDateAndTemperatureData(data.hourly.time, data.hourly.temperature_2m)

console.log(dateAndTemperatureData)