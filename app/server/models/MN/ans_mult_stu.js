'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ans_mult_stu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a muchos con Student a través de AnsMultStu
      ans_mult_stu.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
      });

      // Relación muchos a muchos con Question a través de AnsMultStu
      ans_mult_stu.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE',
      });
    }
  }
  ans_mult_stu.init({
    studentId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    respuestaop: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ans_mult_stu',
  });
  return ans_mult_stu;
};