'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var compliments = ['Fear is the path to the Dark Side. Fear leads to anger. Anger leads to hate.', 'Try not. Do or do not. There is no try.', 'Always pass on what you have learned.', 'In a dark place we find ourselves, and a little more knowledge lights our way.', 'You will know the goood from the bad when you are calm. At peace. Passive.'];

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
