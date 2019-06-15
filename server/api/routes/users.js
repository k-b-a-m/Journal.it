const router = require('express').Router();
const {User, Entry} = require('../../db/models/index');

router.get('/:id', (req,res,next) => {
  User.findOne({where: {id: req.params.id}, include: [Entry]})
    .then(user => res.json(user))
    .catch(next);
});

module.exports = router;
