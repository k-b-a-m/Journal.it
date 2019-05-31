const express = require('express');
const app = express();
const path = require('path');

module.exports = app;

// Routes
app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, '../dist', 'main.js')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));

// API Middleware
app.use('/journals', require('./routes/journals'));

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

