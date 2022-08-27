const express = require('express')
const app = express()
const port = 3000
const nodemailer = require("nodemailer");

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "475206aca209b5",
        pass: "0dab5ff18a0025"
    }
});

const message = {
    from: "your_email_account@domain.com",
    to: "recipient_email_account@domain.com",
    subject: "Hello!",
    text: "This is a test of Mailtrap and Nodemailer. "
}

transport.sendMail(message, (err, info) => {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
});