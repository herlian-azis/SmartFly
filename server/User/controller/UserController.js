const { checkPassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const encode = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static userLogin(req, res, next) {
    const { email, password } = req.body;

    if (!req.body.email || req.body.password) {
      next({ name: "EMPTY_FIELD" });
    } else {
      User.findOne({ where: { email } })
        .then((user) => {
          if (user) {
            let compare = checkPassword(password, user.password);

            if (compare) {
              let access_token = encode(user);
              res.status(200).json({ access_token });
            } else {
              next({ name: "INVALID_PASSWORD" });
            }
          } else {
            next({ name: "INVALID_EMAIL" });
          }
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static userRegister(req, res, next) {
    const { email, password, subsStatus, userName } = req.body;
    User.findOne({ where: { email } })
      .then((existUser) => {
        if (existUser) {
          next({ name: "EMAIL_ALREADY_EXIST" });
        } else {
          return User.create({
            email,
            password,
            userName,
            subsStatus,
          });
        }
      })
      .then((newUser) => {
        res.status(201).json({ message: "Success Create User" });
      })
      .catch((err) => {
        console.log(err, "dapat ga ni gadanta");
        next(err);
      });
  }
  static googleSignIn(req, res, next) {
    const id_token = req.body.idToken;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let payload = null;

    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({
          where: {
            email: payload["email"],
          },
        });
      })
      .then((user) => {
        if (user) {
          return user;
        } else {
          let dataUser = {
            email: payload["email"],
            password: process.env.GOOGLE_PASS,
          };
          return User.create(dataUser);
        }
      })
      .then((data) => {
        const access_token = encode({
          id: data.id,
          email: data.email,
        });
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = UserController;
