const set = require('./setquestion.js')
const get = require('./getquestion.js')

module.exports = {
    name: 'question',
    description: 'sets or gets the question of the month!',
    execute(message, args) {
        if (length(args) < 2){
            message.channel.send(get.return());
        }
        const commandName = args.shift().toLowerCase();
        
        if (commandName === "set") {
            set.execute(args);
        }
        else {
            message.channel.send(get.return());
        }
    },
};