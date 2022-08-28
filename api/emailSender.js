let express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
require('dotenv').config();
const cors = require('cors')
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

router.post('/', configuredCors, function (req, res){
    console.log('sending email...')
    console.log(req.body)

    let contactDetails = req.body.contactDetails
    let hairType = req.body.hairType
    let styleSettings = req.body.styleSettings
    function userText() {
        let styles = `<div>Hello ${contactDetails.firstName} ${contactDetails.lastName}, this is your confirmation email for the hair appointment.</div> <div>Hair Type : ${hairType}</div> <span>${styleSettings.preset}</span>`

        function flatten (obj) {
            for(let prop in obj){
                if(typeof prop === 'object'){
                    flatten(prop)
                }else if(typeof prop === 'string'){
                    styles += `<span> ${obj} </span>`
                }
            }
        }
        flatten(styleSettings)
        return styles
    }
    const message1 = {
        from: 'lineUP@gmail.com',
        to: req.body.contactDetails.emailAddress,
        subject: 'Line UP! Appointment Confirmation',
        text: `You have an appointment with ${req.body.barber}`,
        html: userText()
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
        text: `You have an appointment with ${req.body.contactDetails.firstName}`,
        html: userText()
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