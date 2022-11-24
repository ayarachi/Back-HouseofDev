const express = require("express");

const { Property } = require("../models");

const router = express.Router();

// Ruta para añadir propiedad
router.post("/properties", (req, res) => {
  Property.create(req.body).then((property) => res.status(201).send(property));
});

// Para editar propiedad
router.put("/properties/:id", (req, res) => {
  Property.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then(([numeroAfectado, updatedProperty]) => {
    res.send(updatedProperty);
  });
});

// Ruta para borrar propiedad
router.delete("/properties/:id", (req, res) => {
  Property.destroy({
    where: { id: req.params.id },
  }).then(() => res.status(204).send());
});

// Ruta para listar  todas las propiedades
router.get("/properties", (req, res) => {
  Property.findAll().then((property) => res.status(200).send(property));
});

// Ruta para obtener una propiedad en particular
router.get("/properties/:id", (req, res) => {
  Property.findByPk(req.params.id).then((property) =>
    res.status(200).send(property)
  );
});

module.exports = router;
