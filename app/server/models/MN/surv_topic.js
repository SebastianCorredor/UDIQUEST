'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surv_topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      surv_topic.belongsTo(models.Survey, {
        foreignKey: 'surveyId',
        onDelete: 'CASCADE',
      });

      // Relación muchos a muchos con Topic a través de surv_topic
      surv_topic.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        onDelete: 'CASCADE',
      });
    }
  }
  surv_topic.init({
    topicId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'surv_topic',
  });
  return surv_topic;
};