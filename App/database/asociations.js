const User = require("./models/user.model");
const Wallet = require("./models/wallet.model");

User.hasOne(Wallet);
 