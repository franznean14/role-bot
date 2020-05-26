/* eslint-disable no-unused-vars */
const { questions } = require('./role.questions');
const { users } = require('./role.users');

module.exports = {
	name: 'request',
    description: 'Role-assigner bot that collects new server member information through DM then assigns a role afterwards.',
	async execute(member, client) {
        const { user: { username } } = member;
        const response = {};
        // checks if the user already has a record
        // we should retrieve the record from the database of users. This is retrieving from a json file only and is not commiting the data yet.
        if(users.find(user => user.username === username)) {
            member.send('Welcome back!');
        }
        // creates a user object an pushes to the json file.
        users.push({ username });
        for(let i = 0; i < questions.length; i++) {
            const res = await this.asyncQuestions(member, i, client);
            response[questions[i].name] = res;
        }
        const { first, last, email, contact } = response;
        // gets the channel in the guild where the member joined to send an announcement after the member provided his information.
        member.guild.channels.cache.get('712935520321404970').send(`Thank you, ${username}, you will be assigned a trial role in a bit.`);
        // sends the member a message containing the information he provided.
        return member.send(`Thank you, ${first} ${last}, your role has been upgrade for a trial of 3 days! ${email} ${contact}`);
    },
    asyncQuestions(member, index, client) {
        // filter for await message for the commented code below
        // const filter = response => response.author.id === member.id && response.content.length && response.content;
        const { withValidation, validation, question, name } = questions[index];
        return new Promise((resolve, reject) => {
            this.index = index;
            console.log(`index: ${index}`);
            console.log(`promise index: ${this.index}`);
            // role-bot will direct message the new member
            member.send(question).then(async () =>{
                console.log(users);
                // 'on Message' function that enables the new member to DM his responses
                await client.on('message', message => {
                    const { user: { id: memberId, username } } = member;
                    const realUser = users.find(user => user.username == username);
                    try {
                        const { content, author: { id: authorId } } = message;
                        // filter that makes sure the response is also provided through a direct message to the bot
                        // then checks whether the response was provided by the new member user who just joined
                        if(authorId !== memberId || message.channel.type !== 'dm') return;
                        if(realUser[`${name}`]) return;
                        console.log(withValidation);
                        console.log(validation);
                        const isValid = withValidation ? this.validate(content, validation) : true;
                        if(!isValid) {
                            return member.send('Please provide a valid email address.');
                        }
                        realUser[`${name}`] = content;
                        resolve(content);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            });
        });
    },
    validate(content, rule) {
        console.log('validating');
        return rule.test(content);
    },
};