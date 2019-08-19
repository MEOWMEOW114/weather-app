import axios from 'axios';
import {
  FETCH_WEATHER_FORECAST_START,
  FETCH_WEATHER_FORECAST_SUCCESS,
  FETCH_WEATHER_FORECAST_FAILURE,
  SET_TEMPERATURE_UNITS,
  SET_LAST_RECENT_SEARCHES,
} from '../../constants/actionTypes';
const LAST_RECENT_CACHE_SIZE = 3;

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
//https://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=

// https://openweathermap.org/forecast5
const FIVE_DAYS_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherForecastStart = () => ({
  type: FETCH_WEATHER_FORECAST_START,
});

export const fetchWeatherForecastSuccess = weatherForecast => ({
  type: FETCH_WEATHER_FORECAST_SUCCESS,
  payload: {
    weatherForecast,
  },
});

export const fetchWeatherForecastFailure = error => ({
  type: FETCH_WEATHER_FORECAST_FAILURE,
  payload: {
    error,
  },
});

export const fetchWeatherForecast = ({ cityName, latlng, units }) => async (dispatch, getState) => {
  // TODO use formik for form input validation
  if (!cityName && !latlng) {
    dispatch(
      fetchWeatherForecastFailure({
        message: 'Please fill cityname or lat,lng',
      }),
    );
    return;
  }

  if (!cityName && latlng && latlng.split(',').length !== 2) {
    dispatch(
      fetchWeatherForecastFailure({
        message: 'Please fill lat,lng in comma sperated : "35,139"',
      }),
    );
    return;
  }
  dispatch(fetchWeatherForecastStart());
  try {
    const [lat, lon] = latlng.split(',');
    const response = await axios.get(FIVE_DAYS_URL, {
      params: {
        q: cityName || null,
        units, //units metric, imperial. When you do not use units parameter, format is Standard by default.
        lat,
        lon,
        appid: OPEN_WEATHER_API_KEY,
      },
    });
    const weatherForecast = response.data;
    console.log(weatherForecast);
    dispatch(fetchWeatherForecastSuccess(weatherForecast));

    const state = getState();

    let recentResults = state.weatherForecast.recentResults || [];
    // TODO : add checking on city to avoid duplication
    recentResults.splice(0, 0, weatherForecast);
    recentResults = recentResults.slice(0, LAST_RECENT_CACHE_SIZE);
    dispatch(setRecentResults(recentResults));
  } catch (exception) {
    dispatch(fetchWeatherForecastFailure(exception));
  }
};

export const setUnits = units => ({
  type: SET_TEMPERATURE_UNITS,
  payload: {
    units,
  },
});

export const setRecentResults = recentResults => ({
  type: SET_LAST_RECENT_SEARCHES,
  payload: {
    recentResults,
  },
});

export const fetchUnitsIfNeeded = units => async (dispatch, getState) => {
  const state = getState();
  const { dailyForecast, city } = state.weatherForecast;
  if (dailyForecast) {
    await dispatch(
      fetchWeatherForecast({
        cityName: city.name,
        latlng: city.coord.lat + ',' + city.coord.lon,
        units,
      }),
    );
  }
  return dispatch(setUnits(units));
};
