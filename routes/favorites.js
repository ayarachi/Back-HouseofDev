const express = require("express");
const { validateAdmin, validateAuth } = require("../middleware/auth");

const { Favorite, Property } = require("../models");
const { Op } = require("sequelize");
//const Favorites = require("../models/Favorites");
const router = express.Router();

//ruta para crear favoritos
router.post("/", (req, res) => {
  Favorite.create(req.body).then((favorite) => res.status(201).send(favorite));
});

//ruta para eliminar
router.delete("/:id", (req, res) => {
  Favorite.destroy({
    where: { id: req.params.id },
  }).then(() => res.status(204).send());
});

// ruta para ver los favoritos de un usuario en especifico
router.get("/:id", (req, res) => {
  Favorite.findAll({
    where: { userId: req.params.id },
    include: [{ model: Property }],
  }).then((favorite) => res.status(200).send(favorite));
});

module.exports = router;
