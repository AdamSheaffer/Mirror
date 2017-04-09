'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iconUrl = 'images/misc/sunset.svg';
var getMessage = function getMessage(currentTime, sunrise, sunset) {
    var currentTimeInt = +(currentTime.hour + currentTime.minute),
        sunriseInt = +(sunrise.hour + sunrise.minute),
        sunsetInt = +(sunset.hour + sunset.minute);

    if (currentTimeInt < sunriseInt || currentTimeInt > sunsetInt) {
        return 'Sun Rise At ' + formatHour(sunrise.hour) + ':' + sunrise.minute + 'AM';
    } else {
        return 'Sun Set At ' + formatHour(sunset.hour) + ':' + sunset.minute + 'PM';
    }
};

var formatHour = function formatHour(hour) {
    return hour > 12 ? hour - 12 : hour;
};

var SunSetting = exports.SunSetting = function SunSetting(data) {
    _classCallCheck(this, SunSetting);

    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
    this.iconUrl = iconUrl;
    this.message = getMessage(data.current_time, data.sunrise, data.sunset);
};
//# sourceMappingURL=SunSetting.js.map
