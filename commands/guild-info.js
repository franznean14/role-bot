/* eslint-disable no-unused-vars */
module.exports = {
	name: 'guild-info',
	description: 'Server Info!',
	execute(message, args) {
        message.channel.send(`Your server: ${message.guild.name}\nYour server ID: ${message.guild.id}`);
	},
};