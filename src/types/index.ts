import { DateTime } from "luxon"

export interface WeatherApiResponse {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string
    timezone_abbreviation: string,
    elevation: number,
    hourly_units: { time: string, temperature_2m: string },
    hourly: {
        time: number[],
        temperature_2m: number[]
    }
}

export interface CombinedDateAndTemperatureData {
    unixTime: number,
    date: Date,
    luxonDate: DateTime<true> | DateTime<false>
    temperature: number
}