const router = require('express').Router();
const Entry = require('../../db/models/Entry');

module.exports = router;

router.get('/', (req, res, next) => {
  Entry.findAll()
    .then(entries => res.json(entries))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Entry.create(req.body)
    .then(newEntry => res.json(newEntry))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Entry.update(
    {
      content: req.body.content,
    },
    {
      returning: true,
      where: {
        id: req.params.id,
      },
    }
  )
    .then(updatedEntry => res.json(updatedEntry))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Entry.destroy({ where: { id: req.params.id } })
    .then(destroyedEntry => res.json(destroyedEntry))
    .catch(next);
});