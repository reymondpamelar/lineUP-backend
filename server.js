let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let port = process.env.PORT || 8080;

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
}
const configuredCors = cors(corsOptions);
app.options('*', configuredCors)

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.listen(port);
console.log("App listening on port : " + port);

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "reymondpamelar@gmail.com",
        pass: "ixpcguejozmsfrwp"
    }
});

app.post('/api/send_confirmation_mail', configuredCors, function (req, res){
    console.log('sending email...')
    console.log(req.body)
    const message = {
        from: 'lineUP@gmail.com',
        to: req.body.contactDetails.emailAddress,
        subject: 'Line UP! Appointment Confirmation',
        text: `You have an appointment with ${req.body.barber}`
    }
    res.status(200).send("User Page");
    transport.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
})