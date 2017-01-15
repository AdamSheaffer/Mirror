'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calendar = undefined;

var _constants = require('constants');

var TZ = moment.tz.guess();
var CLIENT_ID = 'hMS5DG_hTFFsYGPdaH5wavwLOfXCcXFV';
var CLIENT_SECRET = '5kj0dTSd4eVb_02yOTFwrQYJ5OdDjTb1qxgc0k-Xf30ZxsgEuo3U3E4_EYZpzZEDOM3AnwjcFTRx902f8Ddw_Q';
var SCOPE = 'read_events';
var REDIRECT_URL = 'http://localhost:8080';
var PROXY = 'http://localhost:1337/';
var BASE_URL = 'http://app.cronofy.com/oauth/authorize?response_type=code';
var API_URL = 'https://api.cronofy.com/v1/calendars';

var getUrlParam = function getUrlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return !!results ? decodeURI(results[1]) : undefined;
};

var calendar = exports.calendar = function () {
    var url = '' + BASE_URL + ('&client_id=' + CLIENT_ID) + ('&client_secret=' + CLIENT_SECRET) + ('&redirect_uri=' + REDIRECT_URL) + ('&scope=' + SCOPE);

    var hasToken = function hasToken() {
        return !!getUrlParam('code');
    };

    var getEvents = function getEvents() {
        var accessToken = getUrlParam('code');
        var xhr = new XMLHttpRequest();
        var url = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=16753354fab44e17869b85d2a030ac04';
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                debugger;
                var res = JSON.parse(xhr.responseText);
                console.log(res);
            }
        };
        var options = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: accessToken,
            redirect_uri: REDIRECT_URL
        };
        xhr.send();
    };

    return { url: url, hasToken: hasToken, getEvents: getEvents };
}();
//# sourceMappingURL=calendar.js.map
