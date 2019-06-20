const router = require('express').Router();
const Entry = require('../../db/models/Entry');
const {Op} = require('sequelize');
const findNearbyMinMaxCoordinates = require('./utility');

router.get('/', (req, res, next) => {
  Entry.findAll()
    .then(entries => res.json(entries))
    .catch(next);
});

router.post('/mapmarkers', (req, res, next) => {
  const {min, max} = req.body;
  Entry.findAll({
    where: {
      [Op.and]: {
        latitude: {
          [Op.between]: [min.latitude, max.latitude].sort((a, b) => a - b),
        },
        longitude: {
          [Op.between]: [min.longitude, max.longitude].sort((a, b) => a - b),
        },
      },
    },
  })
    .then(resp => {
      res.json(resp);
    })
    .catch(next);
});

router.post('/nearby', (req, res, next) => {
  const {coordinate, distance} = req.body;
  const {min, max} = findNearbyMinMaxCoordinates(coordinate, distance);
  Entry.findAll({
    where: {
      [Op.and]: {
        latitude: {
          [Op.between]: [min.latitude, max.latitude].sort((a, b) => a - b),
        },
        longitude: {
          [Op.between]: [min.longitude, max.longitude].sort((a, b) => a - b),
        },
      },
    },
  })
    .then(resp => {
      res.json(resp);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Entry.create(req.body)
    .then(newEntry => res.json(newEntry))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Entry.update(req.body, {
    where: {
      id: +req.params.id,
    },
  })
    .then(() => Entry.findByPk(+req.params.id))
    .then(updatedEntry => res.json(updatedEntry))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Entry.destroy({where: {id: req.params.id}})
    .then(destroyedEntry => res.json(destroyedEntry))
    .catch(next);
});

module.exports = router;
