const router = require('express').Router();
const Journal = require('../../db/models/Journal');

module.exports = router;

router.get('/', (req,res,next) => {
  Journal.findAll()
    .then(journals => res.json(journals))
    .catch(next);
});

router.post('/', (req,res,next) => {
  Journal.create(req.body)
    .then(newJournal => res.json(newJournal))
    .catch(next);
});

router.put('/:id', (req,res,next) => {
  Journal.update(
    {
      content: req.body.content,
    },
    {
      returning: true, where: {
        id: req.params.id
      },
    },
  )
  .then(updatedJournal => res.json(updatedJournal))
  .catch(next);
});

router.delete('/:id', (req,res,next) => {
  Journal.destroy({where: {id: req.params.id}})
    .then(destroyedJournal => res.json(destroyedJournal))
    .catch(next);
});
