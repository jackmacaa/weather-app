import { DateTime } from 'luxon';
import {
  CombinedDateAndTemperatureData,
  RecommendedClothes,
  TonightsWeatherData,
  WeatherApiResponse,
} from './types/index.js';

export const getMinOrMaxTemperature = (
  dateAndTemperatureData: CombinedDateAndTemperatureData[],
  type: 'MIN' | 'MAX'
): CombinedDateAndTemperatureData => {
  const minOrMaxTemperature = dateAndTemperatureData.reduce((prev, current) => {
    if (type === 'MAX') {
      if (current.temperature > prev.temperature) {
        return current;
      }
      return prev;
    } else {
      if (current.temperature < prev.temperature) {
        return current;
      }
      return prev;
    }
  });

  if (minOrMaxTemperature) {
    return minOrMaxTemperature;
  }

  throw new Error(`Could not find ${type} temperature`);
};

export const combineDateAndTemperatureData = (
  times: number[],
  temperatures: number[]
): CombinedDateAndTemperatureData[] => {
  if (times.length !== temperatures.length) {
    throw new Error('time and temp data not valid');
  }

  return times.map((time, i) => {
    const date = new Date(time * 1000);
    return {
      unixTime: time,
      date,
      luxonDate: convertDateFormatAndTimezone(date, 'Australia/Adelaide'),
      temperature: temperatures[i],
    };
  });
};

export const convertDateFormatAndTimezone = (date: Date, timeZone: string) => {
  return DateTime.fromJSDate(date, { zone: timeZone });
};

export const getTempDataNightTime = (
  dateAndTemperatureData: CombinedDateAndTemperatureData[]
) => {
  const hourInSeconds = 3600;
  const twelveHoursInSeconds = 12 * hourInSeconds;

  const startNightTime = dateAndTemperatureData.find((data) => {
    if (data.luxonDate.hour === 19) {
      return data;
    }
  });

  if (!startNightTime) {
    throw new Error('Could not find start of night time');
  }

  return dateAndTemperatureData.filter((data) => {
    if (
      data.unixTime >= startNightTime.unixTime &&
      data.unixTime <= startNightTime.unixTime + twelveHoursInSeconds
    ) {
      return data;
    }
  });
};

export const getRecommendedClothes = (
  minTemperature: number,
  maxTemperature: number,
  variance: number = 0
): RecommendedClothes => {
  if (minTemperature > 22 + variance) {
    return 'Singlet';
  } else if (minTemperature < 14 + variance) {
    return 'SleepingBag';
  } else {
    return 'Onesie';
  }
};

export const getTonightsWeatherData = (
  weatherData: WeatherApiResponse
): TonightsWeatherData => {
  const dateAndTemperatureData = combineDateAndTemperatureData(
    weatherData.hourly.time,
    weatherData.hourly.temperature_2m
  );

  const nightTimeData = getTempDataNightTime(dateAndTemperatureData);

  const minTemperature = getMinOrMaxTemperature(nightTimeData, 'MIN');

  const maxTemperature = getMinOrMaxTemperature(nightTimeData, 'MAX');

  const recommendedClothes = getRecommendedClothes(
    minTemperature.temperature,
    maxTemperature.temperature,
    3
  );

  return {
    temperaturatureDataFor: maxTemperature.luxonDate.toLocaleString(
      DateTime.DATETIME_MED
    ),
    recommendedClothes,
    minTemperature: minTemperature.temperature,
    maxTemperature: maxTemperature.temperature,
  };
};
