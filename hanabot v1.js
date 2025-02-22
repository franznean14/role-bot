// require the discord.js module
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(/ +/);
const command = args.shift().toLowerCase();

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send('Pong.');
  }
 else if (message.content.startsWith(`${prefix}beep`)) {
    message.channel.send('Boop.');
  }
  else if (command === 'server') {
    message.channel.send(`Server name: ${message.guild.name}
    Total members: ${message.guild.memberCount}
    Owner is: ${message.guild.owner} with ID: ${message.guild.ownerID}`);
  }
  else if (command === 'user-info') {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
  else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  }
  else if (command === 'kick') {
    const noTagged = !message.mentions.users.size;
    if (noTagged) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    // grab the "first" mentioned user from the message
    // this will return a `User` object, just like `message.author`
    const taggedUser = message.mentions.users.first();
    message.channel.send(`You wanted to kick: ${taggedUser.username}`);

  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
    });

    // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  }
  else if (command === 'prune') {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    }
    else if (amount < 1 || amount > 99) {
      return message.reply('you need to input a number between 1 and 99.');
    }

      message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!');
    });
  }
});

// login to Discord with your app's token
client.login(token);
