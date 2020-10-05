const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("carrito", {

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: {
          args: true,
          msg: "Campo price - No es un decimal",
        }
      }
    },

    cantidad: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: '0',
      validate: {
        isInt: {
          args: true,
          msg: "Campo stock - No es un decimal"
        }
      }
    },
    estado: {
      type: DataTypes.ENUM('carrito','creada', 'procesando', 'cancelada', 'completa')
    } 
  });
}