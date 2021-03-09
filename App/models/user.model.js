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
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: {
          msg: "it must be a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: [5-255],
          msg: "the password must be at least 5 characters long"
        }
      }
    }
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
