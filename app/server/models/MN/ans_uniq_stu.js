'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ans_uniq_stu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a muchos con Student a través de AnsUniqStu
      ans_uniq_stu.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
      });
      
      ans_uniq_stu.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE',
      });
    }
  }
  ans_uniq_stu.init({
    studentId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    respuesta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ans_uniq_stu',
  });
  return ans_uniq_stu;
};