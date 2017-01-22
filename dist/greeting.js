'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var compliments = ['Confidence Looks Sexy On You.', 'Muy Caliente!', 'You\'re absolutely gorgeous, and that\'s the least interesting thing about you', 'Looking Great, Gorgeous!', 'OooOOooOoO Mami!', 'You Are Beyonce Always.', 'You Look Incredible', 'Stunning!', 'Finer Than Frog\s Hair!', 'Dayuuum!', 'Best CPA Around!', 'The Babe With The Power', 'Looking Good, Umami'];

var greetingService = exports.greetingService = function () {
    var index = 0;

    var randIx = function randIx() {
        var newIndex = Math.floor(Math.random() * compliments.length);
        if (newIndex === index) {
            randIx();
        } else {
            index = newIndex;
            return index;
        }
    };
    var getCompliment = function getCompliment() {
        return compliments[randIx()];
    };

    var loopCompliments = function loopCompliments(seconds, callback) {
        setInterval(function () {
            callback(getCompliment());
        }, seconds * 1000);
    };

    return { getCompliment: getCompliment, loopCompliments: loopCompliments };
}();
//# sourceMappingURL=greeting.js.map
