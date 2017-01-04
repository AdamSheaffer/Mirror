export const voiceService = (() => {
    let commands = {};

    const whenSaid = (trigger, cb) => {
        commands[trigger] = cb;
        return voiceService;
    }

    const start = () => {
        if (!annyang) {
            return console.warn('Voice detection is unavailable');
        }

        annyang.addCommands(commands);
        annyang.start();
    }

    return { whenSaid, start }

})();