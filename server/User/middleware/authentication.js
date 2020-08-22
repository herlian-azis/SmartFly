const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { User } = require("../models");

const authentication = (req, res, next) => {
  const access_token = req.headers.access_token;

  try {
    if (!access_token) {
      next({ name: "ACCESS_TOKEN_NOT_FOUND" });
    } else {
      const userData = jwt.verify(access_token, secret);
      req.userData = userData;
      User.findOne({ where: { email: userData.email } })
        .then((user) => {
          if (user) {
            next();
          } else {
            next({ name: "NOT_LOGGED_IN" });
          }
        })
        .catch((err) => {
          next();
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
