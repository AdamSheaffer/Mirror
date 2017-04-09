import { CONSTANTS } from 'constants';
import { Forecast } from 'Forecast';
import { WeatherConditions } from 'WeatherConditions';
import { SunSetting } from 'SunSetting';

const API_KEY = CONSTANTS.WEATHER_API_KEY;
const BASE_URL = `//api.wunderground.com/api/${API_KEY}/`;
const FORECAST_URL = `${BASE_URL}hourly/q/`;
const CONDITIONS_URL = `${BASE_URL}conditions/q/`;
const ASTRONOMY_URL = `${BASE_URL}astronomy/q/`;

export const weatherService = (() => {
    const forecast = (coords, onSuccess) => {
        let url = `${FORECAST_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)['hourly_forecast'];
                let fc = new Forecast(res, 6);
                onSuccess(fc);
            }
        };
        xhr.send();
    }

    const conditions = (coords, onSuccess) => {
        let url = `${CONDITIONS_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)['current_observation'];
                let conditions = new WeatherConditions(res);
                onSuccess(conditions);
            }
        };
        xhr.send();
    }

    const formatTime = (hour, min) => {
        hour = hour > 12 ? hour - 12 : hour;
        let h = hour < 10 ? `0${hour}` : `${hour}`;
        let m = min < 10 ? `0${min}` : `${min}`;
        return `${h}:${min}`;
    }

    const sunset = (coords, onSuccess) => {
        let url = `${ASTRONOMY_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)['moon_phase'];
                let sunSetting = new SunSetting(res);
                onSuccess(sunSetting);
            }
        };
        xhr.send();
    }

    const subscribe = (method, timer, coords, cb) => {
        if(!weatherService[method] || !weatherService[method].call) {
            return console.error('No weatherService method named' + method);
        }

        weatherService[method](coords, cb);
        setInterval(() => {
            weatherService[method](coords, cb);
        }, timer)
    }

    return { forecast, conditions, subscribe, sunset }

})();




