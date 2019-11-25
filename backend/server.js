// Mongoose - Allows us to setup schemas for the data we store in our MongoDB database. We will also set up our database connection using Mongoose.
const mongoose = require('mongoose');
// Express - Framework for nodeJS. Handles our routing and connection info (port, etc.)
const express = require('express');
// Morgan - Handles logging stuff for databases.
const logger = require('morgan');
// Body-Parser - Makes sure the body of our request is formatted correctly (in this case, we'll use JSON).
const bodyParser = require('body-parser');
// Import the getSecret function from the secret.js file.
const getSecret = require('./secret');

// Constant to hold the port that we are going to use to connect.
const API_PORT = 3001;

// Create an Express app that will run on our node server.
const app = express();

// Create an Express router which actually handles the routing.
const router = express.Router();

// Use mongoose to set up a connection to the database. 
mongoose.connect(getSecret('dbUrl'), { useNewUrlParser: true, useFindAndModify: false });

// Reference to our database connection.
let db = mongoose.connection;

// Use the database connection to print out an error if one occurs when we try to connect to the database.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure body-parser and morgan.
app.use(bodyParser.urlencoded({ extended: false })); // Used for parsing data formatted in the x-www-form-urlencoded format.
app.use(bodyParser.json()); // Used for parsing data formatted in the JSON format.
app.use(logger('dev'));

// Default route that will run whenever we first connect to the server.
router.get('/', (req, res) => {
    res.json({ message: 'HELLO WORLD' });
});

// Tell Express to use a certain path and to use the router we set up.
app.use('/', router);

// Tell Express to listen for requests on the appropriate port.
app.listen(API_PORT, () => console.log('LISTENING ON PORT:' + API_PORT));