const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Wallet extends Model {}
Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  },
  {
    sequelize,
    modelName: "wallet",
  }
);

module.exports = Wallet;
