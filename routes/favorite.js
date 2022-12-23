const express = require("express");
const { validateAdmin, validateAuth } = require("../middleware/auth");

const { Favorite } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

//ruta para crear favoritos
router.post("/favorites", (req, res) => {
  Favorite.create(req.body).then((favorite) => res.status(201).send(favorite));
});

//ruta para eliminar
router.delete("/:id", (req, res) => {
  Property.destroy({
    where: { id: req.params.id },
  }).then(() => res.status(204).send());
});
// ruta para ver los favoritos de un usuario en especifico
router.get("/:id", (req, res) => {
  Favorite.findAll( {where: { userId: req.params.id }}).then((favorite) =>
    res.status(200).send(favorite)
  );
});
