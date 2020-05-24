const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
// creates a new Discord collention for commands
client.commands = new Discord.Collection();
// gets the js files containing the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// maps the listed command files and add them as required
// then
commandFiles.map(file => {
  const command = require(`./commands/${file}`);
  // gets the name of the command and the command object itself to add them to the 'commands' collection
	client.commands.set(command.name, command);
});

const cooldowns = new Discord.Collection();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
});

// runs when a new member joins the server
client.on('guildMemberAdd', async member => {
  const command = client.commands.get('request');
  const args = 'trial';
  command.execute(member, args, client);
});

client.on('message', async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // checks whether the command or an alias exist in a command
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  // checks whether the command is executable in servers(guilds) only
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  // checks whether the command requires argument(s) and if it is supplied
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    reply += command.usage && `\nThe proper usage would be: \`${prefix}${commandName} ${command.usage}\``;

    return message.channel.send(reply);
  }

  // checks whether the cooldown collections already has the command, otherwise adds it
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      // commandName is the command/alias the user input. Originally, it's command.name
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// login to Discord with your app's token
client.login(token);
