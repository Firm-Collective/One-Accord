const accountSid = 'AC61523712056e836fa23c553f2de5e8e7';
const authToken = '7907976989184d2f0004dd9164efb864';
const client = require('twilio')(accountSid, authToken);


client.messages
    .create({
        body: 'Ivanina aplikacija',
        from: '+12563048389',
        to: '+385994104110'
    })
    .then((message) => console.log(message.sid));