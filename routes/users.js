const express = require("express");
const router = express.Router();
const { ValidationError } = require("sequelize");

const { generateToken } = require("../config/token");
const { validateAuth,validateAdmin } = require("../middleware/auth");
const { User } = require("../models");



//ruta para registrarse
router.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).send(err.errors);
      }
      throw err;
    });
});
//ruta para login
router.post("/login", (req, res) => {
  const { email, pass } = req.body;
  console.log(email);
  User.findOne({ where: { email: email } }).then((user) => {
    console.log(user);
    if (!user) return res.sendStatus(401);

    user.validatePassword(pass).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      };
      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});
//ruta para logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//ruta de perfil  del usuario user
router.get("/profile/:id", validateAuth, (req, res) => {
  const id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    res.send(user);
  });
});

//ruta para mostrar todos los usuarios
router.get("/usuario", validateAdmin, (req, res) => {
  User.findAll() 
  .then((resultado) => {
    res.status(200).send(resultado);
    
  })
  .catch((err) => console.log("error", err))

});
//ruta para eliminar usuario
router.delete("/:id", validateAdmin,(req, res) => {
  User.destroy({
    where: { id: req.params.id },
  }).then(() => res.status(204).send());
});



module.exports = router;
