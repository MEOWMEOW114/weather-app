import axios from 'axios';
import {
  FETCH_WEATHER_FORECAST_START,
  FETCH_WEATHER_FORECAST_SUCCESS,
  FETCH_WEATHER_FORECAST_FAILURE,
  SET_TEMPERATURE_UNITS,
} from '../../constants/actionTypes';

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

export const fetchWeatherForecast = (cityName, units) => async dispatch => {
  dispatch(fetchWeatherForecastStart());
  try {
    const response = await axios.get(FIVE_DAYS_URL, {
      params: {
        q: cityName || null,
        units, //units metric, imperial. When you do not use units parameter, format is Standard by default.

        appid: OPEN_WEATHER_API_KEY,
      },
    });
    const weatherForecast = response.data;
    console.log(weatherForecast);
    dispatch(fetchWeatherForecastSuccess(weatherForecast));
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

export const fetchUnitsIfNeeded = units => async (dispatch, getState) => {
  const state = getState();
  const { dailyForecast, city } = state.weatherForecast;
  if (dailyForecast) {
    await dispatch(fetchWeatherForecast(city.name, units));
  }
  return dispatch(setUnits(units));
};
