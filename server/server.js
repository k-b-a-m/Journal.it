const app = require('./app');
let port = process.env.PORT || 3000;

//Start server
app.listen(port, () => console.log(`Server listening on: http://localhost:3000`));
