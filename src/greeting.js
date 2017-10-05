const compliments = [
    'Fear is the path to the Dark Side. Fear leads to anger. Anger leads to hate.',
    'Try not. Do or do not. There is no try.',
    'Always pass on what you have learned.',
    'In a dark place we find ourselves, and a little more knowledge lights our way.',
    'You will know the goood from the bad when you are calm. At peace. Passive.'
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

