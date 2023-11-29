'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student.belongsToMany(models.survey, {
        through: 'student_survey',
        foreignKey: 'studentId',
        otherKey: 'surveyId',
      });
      student.belongsToMany(models.question, {
        through: 'ans_mul_stu',
        foreignKey: 'studentId',
        otherKey: 'questionId',
      });
      student.belongsToMany(models.question, {
        through: 'ans_uniq_stu',
        foreignKey: 'studentId',
        otherKey: 'questionId',
      });
    }
  }
  student.init({
    cedula: DataTypes.STRING,
    correo: DataTypes.STRING,
    sede: DataTypes.STRING,
    programa: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    contraseña: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};