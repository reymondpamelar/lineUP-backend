let express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
require('dotenv').config();
const cors = require('cors')
const path = require("path");
const hbs = require('nodemailer-express-handlebars')

const corsOptions = {
    origin: 'http://localhost:3000',
}
const configuredCors = cors(corsOptions);

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transport.use('compile', hbs(handlebarOptions))

router.post('/', configuredCors, function (req, res){
    console.log('sending email...')
    console.log(req.body)

    let contactDetails = req.body.contactDetails
    let hairType = req.body.hairType
    let styleSettings = req.body.styleSettings
    const message1 = {
        from: 'lineUP@gmail.com',
        to: req.body.contactDetails.emailAddress,
        subject: 'Line UP! Appointment Confirmation',
        template: 'email',
        context:{
            firstName: contactDetails.firstName
        },
    }
    transport.sendMail(message1, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });

    const message2 = {
        from: 'lineUP@gmail.com',
        to: 'reymondpamelar@gmail.com',
        subject: 'Line UP! Barber Confirmation',
        template: 'email',
        context:{
            firstName: contactDetails.firstName,
            lastName: contactDetails.lastName,
            hairType: hairType,
            preset: styleSettings.preset,
            fadeType: styleSettings.fadeType,
            trimStyle: styleSettings.trimSet.trimStyle,
            trimType1: styleSettings.trimSet.trimType[0] || '',
            trimType2: styleSettings.trimSet.trimType[1] || '',
            trimType3: styleSettings.trimSet.trimType[2] || '',
        },
    }
    transport.sendMail(message2, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
    res.status(200).send("User Page");
})
module.exports = router;