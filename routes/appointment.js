const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment")
const { validateAuth } = require("../middleware/auth")

//ruta para crear una cita 

router.post("/", validateAuth, (req, res) => {
  const { id: userId } = req.user;
  const { date, propertyId } = req.body;
  Appointment.create({ userId: userId, propertyId: propertyId, date: date })
    .then((date) => res.send(date))
    .catch((error) => console.log(error));
});

