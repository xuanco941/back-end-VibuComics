// const functions = require("firebase-functions");

const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


const Route = require('./routes/index');
Route(app);

const port = 5001;
app.listen(port,() => console.log(`http://localhost:${port}`));

// exports.app = functions.https.onRequest(app);