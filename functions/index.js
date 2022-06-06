const functions = require("firebase-functions");

const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const multer = require('multer');

const cors = require('cors');
app.use(cors());


const Route = require('./routes/index');
Route(app);

exports.app = functions.https.onRequest(app);