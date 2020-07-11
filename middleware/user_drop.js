const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (req.user.isUser) return res.status(403).send("Access denied");

  try {
    const decoded = jwt.verify(
      token,
      "jwtPrivateKey" /*config.get("jwtPrivateKey")*/
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
