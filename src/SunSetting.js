const iconUrl = 'images/misc/sunset.svg';
const getMessage = (currentTime, sunrise, sunset) => {
    let currentTimeInt = +(currentTime.hour + currentTime.minute),
        sunriseInt = +(sunrise.hour + sunrise.minute),
        sunsetInt = +(sunset.hour + sunset.minute);

    if(currentTimeInt < sunriseInt || currentTimeInt > sunsetInt) {
        return `Sun Rise At ${formatHour(sunrise.hour)}:${sunrise.minute}AM`;
    } else {
        return `Sun Set At ${formatHour(sunset.hour)}:${sunset.minute}PM`;
    }
}

const formatHour = (hour) => {
    return hour > 12 ? hour - 12 : hour;
}

export class SunSetting {
    constructor(data) {
        this.sunrise = data.sunrise;
        this.sunset = data.sunset;
        this.iconUrl = iconUrl;
        this.message = getMessage(data.current_time, data.sunrise, data.sunset);
    }
}