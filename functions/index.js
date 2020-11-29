
const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const GooglePlaces = require('google-places-web');
const Places = GooglePlaces.default;
Places.apiKey = "AIzaSyBWMoZX5xY3yW07JpwybHdhogQn9R1XG4c";


const app = express();

app.use(cors({origin: true}));
app.use(express.json())

app.get("/", (req,res) => {
  return res.send("OK")
})

app.post('/search', async (req,res) => {
  console.log(req.body);
  let response = await Places.textsearch(req.body);
  return res.send(response)
})

exports.api = functions.https.onRequest(app);