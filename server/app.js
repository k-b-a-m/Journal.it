const express = require('express');
const app = express();
const path = require('path');

module.exports = app;

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
app.use('/journals', require('./api/routes/journals'));

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

