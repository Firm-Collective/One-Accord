const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);


client.messages
    .create({
        body: 'Ivanina aplikacija',
        from: '+12563048389',
        to: '+385994104110'
    })
    .then((message) => console.log(message.sid));