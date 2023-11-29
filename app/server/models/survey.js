'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      survey.hasMany(models.question, {
        foreignKey: 'surveyId',
        onDelete: 'CASCADE'
      });
      survey.belongsTo(models.pollster, { foreignKey: 'id'});
      
      // Relación muchos a muchos con Student a través de student_survey
      survey.belongsToMany(models.student, {
        through: 'student_survey',
        foreignKey: 'surveyId',
        otherKey: 'studentId',
      });


      // Relación muchos a muchos con Topic a través de surv_topic
      survey.belongsToMany(models.topic, {
        through: 'surv_topic',
        foreignKey: 'surveyId',
        otherKey: 'topicId',
      });
    }
  }
  survey.init({
    pollsterId: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    fechacreacion: DataTypes.DATE,
    fechaactivacion: DataTypes.DATE,
    fechadesactivacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'survey',
  });
  return survey;
};