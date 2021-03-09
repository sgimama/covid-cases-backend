const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
