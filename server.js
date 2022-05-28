const express = require('express');
const path = require('path');
const connection = require('./db/connection');
const index = require('./index.js')

// Tell node that we are creating an "express" server
const app = express()
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
