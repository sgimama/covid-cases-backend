const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  //login
  signIn(req, res) {},

  //register
  signUp(req, res) {
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
        });
        //Create token
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });
        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
