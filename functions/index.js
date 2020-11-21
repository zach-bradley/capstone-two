const functions = require('firebase-functions');

const express = require("express");

const cors = require("cors");


const app = express();

app.use(cors({origin: true}));
app.use(express.json())

app.get('/', (req,res) => res.status(200).send("Hello world"))

exports.api = functions.https.onRequest(app);