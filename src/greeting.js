const compliments = [
    'Confidence Looks Sexy On You',
    'Muy Caliente!',
    'You\'re absolutely gorgeous, and that\'s the least interesting thing about you',
    'Looking Great, Gorgeous!',
    'OooOOooOoO Mami!',
    'You Are Beyonce Always.',
    'You Look Incredible',
    'Stunning!',
    'Finer Than Frog\s Hair!',
    'Dayuuum!',
    'Best CPA Around!',
    'The Babe With The Power',
    'Looking Good, Umami'
];

export const greetingService = (() => {
    let index = 0;

    const randIx = () => {
        let newIndex = Math.floor(Math.random() * compliments.length);
        if (newIndex === index) {
            randIx();
        } else {
            index = newIndex;
            return index;
        }
    }
    const getCompliment = () => {
        return compliments[randIx()];
    }

    const loopCompliments = (seconds, callback) => {
        setInterval(() => {
            callback(getCompliment())
        }, seconds * 1000);
    }

    return { getCompliment, loopCompliments }

})();

