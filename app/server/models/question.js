'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      question.hasMany(models.opt_uniq_ques, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
      question.hasMany(models.opt_mult_ques, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
      question.belongsToMany(models.topic, {
        through: 'ques_topic',
        foreignKey: 'questionId',
        otherKey: 'topicId',
      });
      question.belongsTo(models.survey, {
        foreignKey: 'surveyId',
        onDelete: 'CASCADE'
      });
      question.belongsToMany(models.student, {
        through: 'ans_mult_stu',
        foreignKey: 'questionId',
        otherKey: 'studentId',
      });
      question.belongsToMany(models.student, {
        through: 'ans_uniq_stu',
        foreignKey: 'questionId',
        otherKey: 'studentId',
      });
    }
  }
  question.init({
    surveyId: DataTypes.INTEGER,
    textopregunta: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};