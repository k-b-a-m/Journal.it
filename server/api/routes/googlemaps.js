const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.GOOGLE_API_KEY;

router.get('/', (req, res, next) => {
  res.send(key);
});

module.exports = router;
