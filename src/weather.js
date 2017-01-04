import { CONSTANTS } from 'constants.js';

const API_KEY = CONSTANTS.WEATHER_API_KEY;
const BASE_URL = `http://api.wunderground.com/api/${API_KEY}/conditions/q/`;

export const weatherService = (() =>{
    const getWeather = (coords, onSuccess) => {
        let url = `${BASE_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                onSuccess(JSON.parse(xhr.responseText)['current_observation']);
            }
        };
        xhr.send();
    }

    const subscribe = (timer, coords, cb) => {
        weatherService.getWeather(coords, cb);
        setInterval(() => {
            weatherService.getWeather(coords, cb);
        }, timer)
    }

    return { getWeather, subscribe }

})();




