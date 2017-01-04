import { Location } from 'location.js';
import { weatherService } from 'weather.js';
import { greetingService } from 'greeting.js';
import { voiceService } from 'voiceService.js';
import { clock } from 'clock.js';

const weatherComponent = $('#weather');
const weatherIcon = $('<img />');
const clockComponent = $('#clock');
const calendarComponent = $('#calendar');
const greetingComponent = $('#greeting');
const locationComponent = $('#location');


/********* WEATHER *********/
const degreeChar = String.fromCharCode(176);

const onWeatherReady = (weather) => {
    locationComponent.text(weather['display_location'].full);
    weatherComponent.text(weather['temp_f'] + degreeChar);
    weatherIcon.attr('src', weather['icon_url']);
    weatherComponent.append(weatherIcon);
};

const location = new Location();
location.getCoords((coords) => {
    weatherService.getWeather(coords, onWeatherReady);
    weatherService.subscribe(900000, coords, onWeatherReady);
});

/********* GREETING *********/
const setGreeting = () => {
    greetingComponent.text(greetingService.getCompliment());
};
setGreeting();

/********* VOICE *********/
voiceService
    .whenSaid('how do I look', setGreeting)
    .start();


/********* CLOCK *********/
clock.init((now) => {
    clockComponent.text(now.time);
})

/********* CALENDAR *********/
