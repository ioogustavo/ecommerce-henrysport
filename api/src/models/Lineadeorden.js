const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('Lineadeorden', {
  
      cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isFloat: {
                args: true,
                msg: "Campo Cantidad - No es un decimal"
          } 
        }
      },

      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isFloat: {
            args: true,
            msg: "Campo price - No es un decimal"
          }
        }
      },
    });
  };
  