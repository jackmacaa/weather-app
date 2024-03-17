import { DateTime } from "luxon";
export const getMinOrMaxTemperature = (dateAndTemperatureData, type) => {
    const minOrMaxTemperature = dateAndTemperatureData.reduce((prev, current) => {
        if (type === 'MAX') {
            if (current.temperature > prev.temperature) {
                return current;
            }
            return prev;
        }
        else {
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
export const combineDateAndTemperatureData = (times, temperatures) => {
    if (times.length !== temperatures.length) {
        throw new Error('time and temp data not valid');
    }
    return times.map((time, i) => {
        const date = new Date(time * 1000);
        return {
            unixTime: time,
            date,
            luxonDate: convertDateFormatAndTimezone(date, 'Australia/Adelaide'),
            temperature: temperatures[i]
        };
    });
};
export const convertDateFormatAndTimezone = (date, timeZone) => {
    return DateTime.fromJSDate(date, { zone: timeZone });
};
export const getTempDataNightTime = (dateAndTemperatureData) => {
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
        if (data.unixTime >= startNightTime.unixTime && data.unixTime <= startNightTime.unixTime + twelveHoursInSeconds) {
            return data;
        }
    });
};
export const getRecommendedClothes = (minTemperature, maxTemperature) => {
    if (minTemperature >= 20) {
        return 'Singlet';
    }
    else if (maxTemperature < 20 && minTemperature > 16) {
        return 'Onesie';
    }
    else {
        return 'SleepingBag';
    }
};
