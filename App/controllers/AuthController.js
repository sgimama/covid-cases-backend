const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  //login
  signIn(req, res) {
    let { email, password } = req.body;

    User.findOne({
      where: {
        email: email,
      },
      include: "wallet",
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ msg: "The email does not exist" });
        } else {
          //Compare passwords
          if (bcrypt.compareSync(password, user.password)) {
            //Create token
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            res.json({
              user: user,
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Incorrect password" });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //register
  signUp(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        //If user not exist
        if (!user) {
          //Encrypt password
          let password = bcrypt.hashSync(req.body.password, authConfig.rounds);
          //Create user
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
          })
            .then((user) => {
              //Create wallet
              Wallet.create({
                userId: user.id,
              }).then((wallet) => {
                user = {
                  ...user.dataValues,
                  wallet: wallet.dataValues,
                };
                //Create token
                let token = jwt.sign({ user: user }, authConfig.secret, {
                  expiresIn: authConfig.expires,
                });
                res.json({
                  user: user,
                  token: token,
                });
              });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(404).json({ msg: "The email already exist" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
