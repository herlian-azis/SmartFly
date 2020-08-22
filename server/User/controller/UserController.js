const { checkPassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const encode = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");

class UserController {
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

  static userLogin(req, res, next) {
    const { email, password } = req.body;
    if (!req.body.email || !req.body.password) {
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

  static async getPromotion(req, res, next) {
    // await cron.schedule("2 * * * * *", async function () {
    console.log("---------------------");
    console.log("Running Cron Job");
    try {
      const isPromo = true;
      const targetEmail = [];
      const data = await User.findAll({ where: { subsStatus: isPromo } });
      await data.map((e) => {
        targetEmail.push(e.dataValues.email);
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
        },
      });

      fs.readFile("./public/bodyEmail.html", { encoding: "utf-8" }, function (
        err,
        html
      ) {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < targetEmail.length; i++) {
            let mailOptions = {
              from: process.env.NODE_MAILER_USER,
              to: `${targetEmail[i]}`,
              subject: `Hei, we are from SmartFly Company, here some Promotion you might be Interest`,
              html: html,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                throw error;
              } else {
                console.log("Email successfully sent!");
              }
            });
          }
        }
      });
    } catch (error) {
      next();
    }
    // });
  }

  static updatePromoStatus(req, res, next) {
    User.findOne({ where: { email: req.userData.email } })
      .then((data) => {
        if (data) {
          return User.update(
            { subsStatus: req.body.subsStatus },
            { returning: true, where: { id: req.userData.id } }
          );
        }
      })
      .then((updatedData) => {
        let result = updatedData[1][0].dataValues;
        res
          .status(200)
          .json({ data: result, message: `Sucessfully update user` });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = UserController;
