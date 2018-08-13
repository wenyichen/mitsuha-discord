const play = require('../util/play');

module.exports = {
	name: 'thisissosad',
	description: 'this is so sad!',
	execute(message) {
		play(message, 'https://youtu.be/L_jWHffIx5E?', 36, 'this is so sad! Playing Despacito!');
	},
};