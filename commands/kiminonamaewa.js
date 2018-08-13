const play = require('../util/play');

module.exports = {
	name: 'kiminonamaewa',
	description: 'kimi no zen zen zense...',
	execute(message) {
		play(message, 'https://www.youtube.com/watch?v=klUWEKZJ4XY', 0, 'Mitsuha!');
	},
};