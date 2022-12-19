const express = require("express");
const { validateAdmin, validateAuth } = require("../middleware/auth");

const { Property } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// Ruta para añadir propiedad
router.post("/", validateAdmin, (req, res) => {
  Property.create(req.body).then((property) => res.status(201).send(property));
});

// Para editar propiedad
router.put("/:id", validateAdmin, (req, res) => {
  console.log("este es el id ", req.params.id);
  Property.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then(([numeroAfectado, updatedProperty]) => {
    res.send(updatedProperty);
  });
});

// Ruta para borrar propiedad
router.delete("/:id", validateAdmin, (req, res) => {
  Property.destroy({
    where: { id: req.params.id },
  }).then(() => res.status(204).send());
});

// Ruta para listar  todas las propiedades
router.get("/", (req, res) => {
  Property.findAll().then((property) => res.status(200).send(property));
});

// Ruta para obtener una propiedad en particular
router.get("/:id", (req, res) => {
  console.log(req.params);
  Property.findByPk(req.params.id).then((property) =>
    res.status(200).send(property)
  );
});
//Ruta de la barra de busqueda

router.get("/busqueda/:busqueda", (req, res) => {
  console.log(req.params);
  Property.findAll({
    where: {
      [Op.or]: [
        { type: { [Op.iLike]: `%${req.params.busqueda}%` } },
        { neighborhood: { [Op.iLike]: `% ${req.params.busqueda}%` } },
        { name: { [Op.iLike]: `% ${req.params.busqueda}%` } },
      ],
    },
  }).then((property) => res.status(200).send(property));
});

module.exports = router;
