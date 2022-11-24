const express = require("express");

const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");

const app = express();

// parsing middleware
app.use(express.json());
app.use("/api", usersRouter);
app.use("/api", propertiesRouter);
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
