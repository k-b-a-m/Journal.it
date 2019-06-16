const router = require('express').Router();
const {User, Entry} = require('../../db/models/index');

router.get('/:fbUserID', (req,res,next) => {
  console.log(`fbID:`, req.params.fbUserID)
  console.log(typeof req.params.fbUserID)
  User.findOne({where: {facebookId: `${req.params.fbUserID}`}, include: [Entry]})
    .then(user => {
      res.json(user)
    })
    .catch(next);
});

router.post('/getOrCreate/:fbUserID', (req,res,next) => {
  User.findOrCreate({where: {facebookId: `${req.params.fbUserID}`}, defaults: {name: `${req.body.name}`}, include: [Entry]})
    .then(([user, created]) => {
      res.json(user)
    })
    .catch(next);
});

module.exports = router;
