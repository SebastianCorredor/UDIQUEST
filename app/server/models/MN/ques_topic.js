'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ques_topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ques_topic.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE',
      });
  
      // Relación con Topic
      ques_topic.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        onDelete: 'CASCADE',
      });
    }
  }
  ques_topic.init({
    questionId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ques_topic',
  });
  return ques_topic;
};