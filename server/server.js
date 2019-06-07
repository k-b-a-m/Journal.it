const app = require("./app");
const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");
let port = process.env.PORT || 3000;
let portSecure = process.env.PORT || 8443;
const { syncAndSeed } = require("./db");
const listeners = require("./listeners");
const socketio = require("socket.io");

//HTTP Server
const httpserver = http
  .createServer(app)
  .listen(port, () =>
    console.log(`HTTP Server listening on: https://localhost:${port}`)
  );

//HTTPS Server
// const httpsServer = https
//   .createServer(
//     {
//       key: fs.readFileSync(
//         path.join(__dirname, "..", "encryption", "server.key")
//       ),
//       cert: fs.readFileSync(
//         path.join(__dirname, "..", "encryption", "server.cert")
//       )
//     },
//     app
//   )
//   .listen(portSecure, () =>
//     console.log(`HTTPS Server listening on: https://localhost:${portSecure}`)
//   );

//Enable Websockets on server
// const io = socketio(httpsServer);
// listeners(io);


syncAndSeed();
