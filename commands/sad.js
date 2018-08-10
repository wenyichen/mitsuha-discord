const ytdl = require('ytdl-core');


module.exports = {
    name: 'sad',
    description: 'this is so sad!',
    execute(message, args) {
        if (message.channel.type !== 'text') return;
        const { voiceChannel } = message.member.voiceChannel;

        if (!voiceChannel) {
            return message.reply("You're not in a channel owo!");
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl('https://youtu.be/L_jWHffIx5E?t=36s', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    },
};