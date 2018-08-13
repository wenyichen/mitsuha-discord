const ytdl = require('ytdl-core');

module.exports = (message, link, seek, reply) => {
	if (message.channel.type !== 'text') return;
	const voiceChannel = message.member.voiceChannel;

	if (!voiceChannel) {
		return message.reply('You\'re not in a channel! òwó');
	}

	// handle bot already in channel
	if (voiceChannel.connection) {
		voiceChannel.leave();
	}

	message.reply(reply);
	voiceChannel.join()
		.then(connection => {
			console.log('joined Channel');
			const stream = ytdl(link, { filter: 'audioonly' });
			const dispatcher = connection.playStream(stream, { 'seek': seek });

			dispatcher.on('end', () => {
				console.log('leaving Channel');
				voiceChannel.leave();
			});
		})
		.catch(console.error(voiceChannel));
};