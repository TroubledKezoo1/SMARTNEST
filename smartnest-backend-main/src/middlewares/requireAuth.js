const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in. " });
  }

  const token = authorization.replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
