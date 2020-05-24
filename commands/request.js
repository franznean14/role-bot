/* eslint-disable no-unused-vars */
const questions = require('./request.json');

module.exports = {
	name: 'request',
    description: 'Quiz bot',
    args: true,
    usage: 'trial/paid',
    cooldown: 5,
	async execute(member, args, client) {
        const response = [];
        if(args !== 'trial' && args !== 'paid') return;
        for(let i = 0; i < questions.length; i++) {
            const res = await this.asyncQuestions(member, i, client);
            response[i] = res;
        }
        const [ first, last, email, contact ] = response;
        const { user: { username } } = member;

        // gets the channel in the guild where the member joined to send an announcement after the member provided his information.
        member.guild.channels.cache.get('712935520321404970').send(`Thank you, ${username}, you will be assigned a trial role in a bit.`);
        // sends the member a message containing the information he provided.
        member.send(`Thank you, ${first} ${last}, for providing your:\n1. Email - ${email},\n2. Contact - ${contact}`);
    },
    asyncQuestions(member, index, client) {
        // filter for await message for the commented code below
        // const filter = response => response.author.id === member.id && response.content.length && response.content;
        return new Promise((resolve, reject) => {
            // role-bot will direct message the new member
            member.send(questions[index].question).then(() =>{

                try {
                    // 'on Message' function that enables the new member to DM his responses
                    client.on('message', async message => {
                        // filter that makes sure the response is also provided through a direct message to the bot
                        // then checks whether the response was provided by the new member user who just joined
                        if(message.author.id !== member.user.id || message.channel.type !== 'dm') return;
                        resolve(message.content);
                    });
                }
                catch (error) {
                    reject(member.send('Looks like you abandoned us!'));
                }
                // awaits messages of the new member who joined the guild
                // member.guild.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                //     .then(collected => {
                //         resolve(collected.first());
                //     })
                //     .catch(collected => {
                //         reject(member.guild.channel.send('Looks like you abandoned us!'));
                //     });
            });
        });
    },
};