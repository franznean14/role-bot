/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
    description: 'Ping!',
    cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};