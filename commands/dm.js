/* eslint-disable no-unused-vars */
module.exports = {
	name: 'dm',
    description: 'Almost the same as Direct Messaging . . . but through an awesome bot. :D',
    args: true,
    usage: '<user> <message>',
    cooldown: 5,
	execute(message, args) {
        const user = message.mentions.users.first();
        const recepient = message.author;
        args.shift();
        const content = args.join(' ');
		user.send(`Hello ${user}! ${recepient} says *${content}*`);
	},
};