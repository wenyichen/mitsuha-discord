const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'notsad',
	description: 'not sad anymore!',
	execute(message) {
		if (message.channel.type !== 'text') return;
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) {
			return message.reply('You\'re not in a channel owo!');
		}

		message.reply('gomenasai :(!');
		if (voiceChannel.connection) {
			client.leaveVoiceChannel(voiceChannel);
		}
	},
};