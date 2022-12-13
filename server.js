const express = require("express");
const morgan = require("morgan")
const app = express();
const routes= require("./routes")
const cookieParser= require("cookie-parser")

// parsing middleware
app.use(cookieParser());
app.use(morgan("tiny"))
app.use(express.json());
app.use("/api",routes);


// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
