const router = require("express").Router();
const Entry = require("../../db/models/Entry");
const { Op } = require('sequelize');

module.exports = router;

router.get("/", (req, res, next) => {
  Entry.findAll()
    .then(entries => res.json(entries))
    .catch(next);
});

router.get("/nearby", (req, res, next) => {
  console.log(req.body.coordinates)
  Entry.findAll({
    where: {
      [Op.and]: {
        latitude: { [Op.between]: req.body.coordinates.latitude },
        longitude: { [Op.between]: req.body.coordinates.longitude }
      }
    }
  })
    .then(resp => {
      res.json(resp);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Entry.create(req.body)
    .then(newEntry => res.json(newEntry))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Entry.update(
    {
      content: req.body.content
    },
    {
      returning: true,
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedEntry => res.json(updatedEntry))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Entry.destroy({ where: { id: req.params.id } })
    .then(destroyedEntry => res.json(destroyedEntry))
    .catch(next);
});
