const jwt = require("jsonwebtoken");
const SECRET = "salta";

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2d" });
};

const validateToken = (token) => {
  return jwt.verify(token,SECRET)
};

module.exports = { generateToken, validateToken };
