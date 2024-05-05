import { DateTime } from "luxon";
import { toast } from "react-toastify";

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      let errorMessage = "Failed to fetch data.";

      if (response.status === 401) {
        errorMessage = "Unauthorized: API key is invalid.";
      } else if (response.status === 404) {
        errorMessage = data?.message ?? "Data not found.";
      }

      // Show error message using toast
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    toast.error(error.message);
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      temp_min: d.temp.min,
      temp_max: d.temp.max,
      icon: d.weather[0].icon,

    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const response = await getWeatherData(
    "weather",
    searchParams
  );
  if (!response) {
    return;
  }
  const formattedCurrentWeather = formatCurrentWeather(response);

  const { lat, lon } = formattedCurrentWeather;

  const response2 = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  });
  const formattedForecastWeather = formatForecastWeather(response2);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconUrlFromCode };
