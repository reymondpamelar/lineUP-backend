let express = require('express');
let bodyParser = require('body-parser');
const emailSender = require("./api/emailSender")

let port = process.env.PORT || 8080;
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
}
const configuredCors = cors(corsOptions);
let app = express();
app.options('*', configuredCors)
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use("/api/emailSender", emailSender)
app.listen(port);
console.log("App listening on port : " + port);