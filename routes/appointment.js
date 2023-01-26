const express = require("express");
const router = express.Router();
const { Appointment } = require("../models");
const { validateAuth } = require("../middleware/auth");

//ruta para crear una cita

router.post("/", validateAuth, (req, res) => {
  const { id: userId } = req.user;
  const { time, propertyId } = req.body;
  Appointment.create({ userId: userId, propertyId: propertyId, time: time })
    .then((date) => res.send(date))
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Internal Error" });
    });
});
module.exports = router;
