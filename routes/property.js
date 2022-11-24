// Para editar propiedad
// Ruta para borrar propiedad
// Ruta para listar  todas las propiedades
// Ruta para obtener una propiedad en particular
const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

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

module.exports = router;
