import { DateTime } from 'luxon';

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

interface Hourly {
  time: number[];
  temperature_2m: number[];
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
}

export interface CombinedDateAndTemperatureData {
  unixTime: number;
  date: Date;
  luxonDate: DateTime<true> | DateTime<false>;
  temperature: number;
}

export type RecommendedClothes = 'Singlet' | 'Onesie' | 'SleepingBag';

export interface TonightsWeatherData {
    temperaturatureDataFor: string;
    recommendedClothes: string;
    minTemperature: number;
    maxTemperature: number;
  }
  