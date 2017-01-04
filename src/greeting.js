const compliments = [
    'Confidence looks sexy on you.',
    'Muy Caliente!',
    'You\'re absolutely gorgeous, and that\'s the least interesting thing about you',
    'Looking great, Gorgeous!',
    'You Are Beyonce Always.'
];

export const greetingService = (() => {
    const randIx = () => {
        return Math.floor(Math.random() * compliments.length);
    }
    const getCompliment = () => {
        return compliments[randIx()];
    }

    return { getCompliment }

})();

