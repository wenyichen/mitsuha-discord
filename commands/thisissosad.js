const ytdl = require('ytdl-core');


module.exports = {
	name: 'thisissosad',
	description: 'this is so sad!',
	execute(message) {
		if (message.channel.type !== 'text') return;
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) {
			return message.reply('You\'re not in a channel! òwó');
		}

		// handle bot already in channel
		if (voiceChannel.connection) {
			voiceChannel.leave();
		}

		message.reply('this is so sad! Playing Despacito!');
		voiceChannel.join()
			.then(connection => {
				console.log('joined Channel');
				const stream = ytdl('https://youtu.be/L_jWHffIx5E?', { filter: 'audioonly' });
				const dispatcher = connection.playStream(stream, { 'seek': 36 });

				dispatcher.on('end', () => {
					console.log('leaving Channel');
					voiceChannel.leave();
				});
			})
			.catch(console.error(voiceChannel));
	},
};