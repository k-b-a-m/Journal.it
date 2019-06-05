const app = require('./app');
let port = process.env.PORT || 3000;
const { syncAndSeed } = require('./db');

//Start server
app.listen(port, () =>
  console.log(`Server listening on: https://localhost:3000`)
);

syncAndSeed();
