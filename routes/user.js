const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/token");

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});

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
        name: user.name,
        lastName: user.lastName,
      };
      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = router;
