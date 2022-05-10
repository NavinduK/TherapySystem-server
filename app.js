var express = require("express");
var mongoose = require("mongoose");
var cors = require('cors');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var app = express();

//Initialize the server running port
var PORT = process.env.PORT || 3001;

//Mongodb connection
var MongoURL = process.env.MONGO_URL;
var connection = mongoose.connection;
mongoose.connect(MongoURL);
connection.once("open", () => {
    console.log ("DB Connected!");
});

// Cors config and json request handle
app.use(cors());
app.use(bodyParser.json());

// Import routes created inside routes folder
var therapysession = require('./routes/therapysession');
var client = require('./routes/client');
var therapist = require('./routes/therapist');

// Create rest Api's for routes
app.use('/sessions', therapysession);
app.use('/clients', client);
app.use('/therapists', therapist);

//run the server by listening the port above
app.listen(PORT, () =>{
    console.log(`Server running on Prot: ${PORT}`)
    });