import axios from 'axios'
import { WeatherApiResponse } from './types/index.js'
import { combineDateAndTemperatureData, getMinOrMaxTemperature, getRecommendedClothes, getTempDataNightTime } from './lib.js'

const weatherApi = 'https://api.open-meteo.com/v1/bom'
const elizabethParkCoords = 'latitude=-34.71&longitude=138.68'

const url = `${weatherApi}?${elizabethParkCoords}&hourly=temperature_2m&timeformat=unixtime&timezone=Australia%2FSydney&forecast_days=2`

const getWeather = async (url: string) => {
    const response = await axios.get<WeatherApiResponse>(url)

    return response
}

const { data } = await getWeather(url)
const data2 = {
    latitude: -34.746094,
    longitude: 138.60352,
    generationtime_ms: 0.011086463928222656,
    utc_offset_seconds: 39600,
    timezone: 'Australia/Sydney',
    timezone_abbreviation: 'AEDT',
    elevation: 46,
    hourly_units: { time: 'unixtime', temperature_2m: '°C' },
    hourly: {
        time: [
            1710594000, 1710597600, 1710601200, 1710604800,
            1710608400, 1710612000, 1710615600, 1710619200,
            1710622800, 1710626400, 1710630000, 1710633600,
            1710637200, 1710640800, 1710644400, 1710648000,
            1710651600, 1710655200, 1710658800, 1710662400,
            1710666000, 1710669600, 1710673200, 1710676800,
            1710680400, 1710684000, 1710687600, 1710691200,
            1710694800, 1710698400, 1710702000, 1710705600,
            1710709200, 1710712800, 1710716400, 1710720000,
            1710723600, 1710727200, 1710730800, 1710734400,
            1710738000, 1710741600, 1710745200, 1710748800,
            1710752400, 1710756000, 1710759600, 1710763200
        ],
        temperature_2m: [
            25.1, 23.6, 22.7, 22.5, 22.4, 21.2, 20.8,
            20.8, 20.6, 21, 21.3, 23.1, 25.3, 27.6,
            29, 30.2, 30.8, 30.8, 30.4, 29.9, 28.4,
            27.2, 25.7, 24.8, 24.3, 24, 23.8, 23.4,
            22.9, 22.5, 22.4, 22.1, 21.9, 22.9, 24.9,
            26.6, 28.2, 29.6, 30.7, 31.3, 31.6, 30.5,
            26.8, 25.2, 23.6, 23, 21.8, 20.4
        ]
    }
}
//console.log(data)

const dateAndTemperatureData = combineDateAndTemperatureData(data.hourly.time, data.hourly.temperature_2m)

const nightTimeData = getTempDataNightTime(dateAndTemperatureData)

const minTemperature = getMinOrMaxTemperature(nightTimeData, 'MIN')
console.log(minTemperature)

const maxTemperature = getMinOrMaxTemperature(nightTimeData, 'MAX')
console.log(maxTemperature)

console.log(getRecommendedClothes(minTemperature.temperature, maxTemperature.temperature))
