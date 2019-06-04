const router = require("express").Router();
const Entry = require("../../db/models/Entry");
const { Op } = require("sequelize");
const findNearbyMinMaxCoordinates = require('./utility')

module.exports = router;

router.get("/", (req, res, next) => {
  Entry.findAll()
    .then(entries => res.json(entries))
    .catch(next);
});

router.get("/mapmarkers", (req, res, next) => {
  const { min, max } = req.body
  Entry.findAll({
    where: {
      [Op.and]: {
        latitude: {
          [Op.between]: [min.latitude, max.latitude]
        },
        longitude: {
          [Op.between]: [min.longitude, max.longitude]
        }
      }
    }
  })
    .then(resp => {
      res.json(resp);
    })
    .catch(next);
});


router.get("/nearby", (req, res, next) => {

 
  //center{latitude, longitude}
  //date today
  //distance 


  



  Entry.findAll({
    where: {
      [Op.and]: {
        latitude: {
          [Op.between]: [req.body.min.latitude, req.body.max.latitude]
        },
        longitude: {
          [Op.between]: [req.body.min.longitude, req.body.max.longitude]
        }
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
