const router = require('express').Router();
const request = require('request');

const myKey = 'AIzaSyArrCtHWVikO63R9VR1PYFEWOHKlDTODj8';

router.get('/', (req, res, next) => {
  request({
    uri: 'https://maps.googleapis.com/maps/api/js?',
    qs: {
      key: myKey,
      libraries: 'visualization',
    },
  }).pipe(res);
});

module.exports = router;
