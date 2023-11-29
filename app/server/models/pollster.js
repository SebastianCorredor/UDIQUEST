'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pollster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pollster.hasMany(models.survey, { 
        foreignKey: 'pollsterId' 
      });
    }
  }
  pollster.init({
    cedula: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    sede: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pollster',
  });
  return pollster;
};