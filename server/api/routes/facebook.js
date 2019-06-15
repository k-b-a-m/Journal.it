const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.FB_APP_ID;

router.get('/', (req, res, next) => {
  res.send(key);
});

module.exports = router;
