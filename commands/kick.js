    /* eslint-disable no-unused-vars */
module.exports = {
    name: 'kick',
    description: 'Kick users!',
    guildOnly: true,
    args: true,
    usage: '<user>',
	execute(message, args) {
        const noTagged = !message.mentions.users.size;
        if (noTagged) {
          return message.reply('you need to tag a user in order to kick them!');
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick ${taggedUser.username} out of ${message.guild.name}!`);
	},
};