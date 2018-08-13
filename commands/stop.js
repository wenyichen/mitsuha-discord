module.exports = {
	name: 'stop',
	aliases: ['thisissosad', 'omaewadareda'],
	description: 'not sad anymore!',
	execute(message) {
		if (message.channel.type !== 'text') return;
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) {
			return message.reply('You\'re not in a channel òwó!');
		}

		message.reply('sorry! uwu');
		if (voiceChannel.connection) {
			voiceChannel.leave();
		}
	},
};