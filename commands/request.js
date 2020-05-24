/* eslint-disable no-unused-vars */
const questions = require('./request.json');

module.exports = {
	name: 'request',
    description: 'Quiz bot',
    args: true,
    usage: 'trial/paid',
    cooldown: 5,
	async execute(member, args) {
        const response = [];
        if(args[0] !== 'trial' && args[0] !== 'paid') return;
        for(let i = 0; i < questions.length; i++) {
            const res = await this.asyncQuestions(member, args, i);
            response[i] = res;
        }
        const [ first, last, email, contact ] = response;
        member.send(`Thank you, ${first} ${last}, for providing your:\n1. Email - ${email},\n2. Contact - ${contact}`);
    },
    asyncQuestions(member, args, index) {
        const filter = response => response.author.id === message.author.id && response.content.length && response.content;
        return new Promise((resolve, reject) => {
            member.send(questions[index].question).then(() =>{
                member.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        resolve(collected.first());
                    })
                    .catch(collected => {
                        reject(member.guild.channel.send('Looks like you abandoned us!'));
                    });
            });
        });
    },
};