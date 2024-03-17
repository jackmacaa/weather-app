import axios from "axios";
const weatherApi = 'https://api.open-meteo.com/v1/bom';
const elizabethParkCoords = 'latitude=-34.71&longitude=138.68';
const url = `${weatherApi}?${elizabethParkCoords}&hourly=temperature_2m&timeformat=unixtime&timezone=Australia%2FSydney&forecast_days=2`;
export const getWeather = async () => {
    const response = await axios.get(url);
    return response.data;
};
