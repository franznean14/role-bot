  /* eslint-disable no-unused-vars */
module.exports = {
	name: 'args-info',
	description: 'Arguments Information!',
	execute(message, args) {
      if (args[0] === 'foo') {
        return message.channel.send('bar');
      }
      message.channel.send(`First argument: ${args[0]}`);
	},
};