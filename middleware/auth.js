const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const user = validateToken(token);
  console.log(user);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

function validateAdmin(req, res, next) {
  console.log("cookies", req.cookies);
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const  user  = validateToken(token);
  if (!user) return res.sendStatus(401);
  if (!user.isAdmin) return res.sendStatus(405);

  req.user = user;
  next();
}
module.exports = { validateAdmin, validateAuth };
