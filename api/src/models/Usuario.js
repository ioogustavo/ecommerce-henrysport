const { DataTypes } = require('sequelize');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {

  const u = sequelize.define('user', {

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          msg: 'Campo name - Debe ser una palabra'
        }
      }
    },

    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          msg: 'Campo apellido - Debe ser una palabra'
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["[A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9]"],
          msg: 'Campo password - Debe ser un conjuto de caracteres, donde cada uno consiste de una letra mayúscula o minúscula, o un dígito. La contraseña debe empezar con una letra y contener al menor un dígito'
        }
      }
    },

    adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mobilephone: {
      type: DataTypes.STRING,
      unique: true,
      // validate:{
      // is:{
      //     args: ['/^[2-9]\d{2}[2-9]\d{2}\d{4}$/'],
      // }
      // }
    },

    rol: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    }

  })

  u.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
  });
};

