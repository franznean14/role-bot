    /* eslint-disable no-unused-vars */
module.exports = {
	name: 'server',
	description: 'Server!',
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}
        Total members: ${message.guild.memberCount}
        Owner is: ${message.guild.owner} with ID: ${message.guild.ownerID}`);
	},
};