'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student_survey.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
      });
  
      // Relación con Survey
      student_survey.belongsTo(models.Survey, {
        foreignKey: 'surveyId',
        onDelete: 'CASCADE',
      });
    }
  }
  student_survey.init({
    studentId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_survey',
  });
  return student_survey;
};