const compliments = [
    'Fear Is The Path To The Dark Side. Fear Leads To Anger. Anger Leads To Hate.',
    'Try Not. Do. Or Do Not. There Is No Try.',
    'Always Pass On What You Have Learned.',
    'In A Dark Place We Find Ourselves, And A Little More Knowledge Lights Our Way.',
    'You Will Know The Goood From The Bad When You Are Calm. At Peace. Passive.'
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

