'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topic.belongsToMany(models.question, {
        through: 'ques_topic',
        foreignKey: 'topicId',
        otherKey: 'questionId',
      });

      // Relación muchos a muchos con Survey a través de surv_topic
      topic.belongsToMany(models.survey, {
        through: 'surv_topic',
        foreignKey: 'topicId',
        otherKey: 'surveyId',
      });
      
    }
  }
  topic.init({
    categoria: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'topic',
  });
  return topic;
};