const express = require("express");

const router = require("./routes/user.js");
const db = require("./config/db ");

const app = express();

// parsing middleware
app.use(express.json());
app.use("/api", router);
// app.use(cookieParser());

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
