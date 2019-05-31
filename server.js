const app = require('./api/app');
let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on: http://localhost:3000`));
