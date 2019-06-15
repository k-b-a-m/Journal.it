const express = require("express");
const app = express();
const path = require("path");

const compression = require('compression');

module.exports = app;

app.use(compression())


//PROD Magic middleware specific to heroku to redirect ALL HTTP requests to HTTPS
//explained here:  https://jaketrent.com/post/https-redirect-node-heroku/
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else next();
  });
}

//DEV Middleware Needed for to redirect ALL http requests to https
// NEED TO COMMENT OUT BEFORE DEPLOY req.secure will always be false on heroku
// app.use((req, res, next) => {
//   console.log(req.header("x-forwarded-proto"))
//   console.log(req.secure)
//   if (req.secure) {
//     console.log('a')
//     next();
//   } else {
//     console.log('b')
//     res.redirect("https://localhost:8443/#" + req.url);
//   }
// });

//Static middleware
app.use(express.static(path.join(__dirname, "public")));

//Parsing middleware
app.use("/", express.json());

//Routes
app.get("/", (req, res, next) => res.sendFile("index.html"));
app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "..", "dist", "main.js"))
);

// API Middleware
app.use("/googlemaps", require("./api/routes/googlemaps"));
app.use("/entries", require("./api/routes/entries"));
app.use('/user', require('./api/routes/users'));

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
