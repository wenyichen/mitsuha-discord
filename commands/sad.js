const ytdl = require('ytdl-core');


module.exports = {
	name: 'sad',
	description: 'this is so sad!',
	execute(message) {
		if (message.channel.type !== 'text') return;
		const voiceChannel = message.member.voiceChannel;

		console.log(voiceChannel);
		if (!voiceChannel) {
			return message.reply('You\'re not in a channel owo!');
		}

		message.reply('Playing Despacito!');
		voiceChannel.join().then(connection => {
			console.log('joined Channel');
			const stream = ytdl('https://youtu.be/L_jWHffIx5E?t=36s', { filter: 'audioonly' });
			const dispatcher = connection.playStream(stream);

			dispatcher.on('end', () => {
				console.log('leaving Channel');
				voiceChannel.leave();
			});
		});
	},
};