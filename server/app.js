const express = require('express');
const app = express();
const path = require('path');

module.exports = app;



//Middleware Needed for PROD to redirect http requests to https
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://localhost:8443`); //For PROD Change this to `https://`+req.headers.host+req.url`
    }
});

//Static middleware
app.use(express.static(path.join(__dirname, 'public')));

//Parsing middleware
app.use('/', express.json());

//Routes
app.get('/', (req, res, next) => res.sendFile('index.html'));
app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

// API Middleware
app.use('/entries', require('./api/routes/entries'));

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
