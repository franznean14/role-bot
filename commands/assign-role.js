/* eslint-disable no-unused-vars */
module.exports = {
	name: 'assign-role',
    description: 'Assign a role to a user',
    args: true,
    usage: '<user> <role>',
    cooldown: 5,
	execute(message, args) {
        const selectedRole = args[1];
        message.channel.send(selectedRole);
        const foundRole = message.guild.roles.cache.find(role => {
            role.name === selectedRole && console.log(role);
        });
        const user = message.mentions.members.first();
        user.roles.add(foundRole);
	},
};

// //NOTWORKING!!!!!!!!!!!!! YET!