'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opt_mult_ques extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      opt_mult_ques.belongsTo(models.question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
    }
  }
  opt_mult_ques.init({
    questionId: DataTypes.INTEGER,
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'opt_mult_ques',
  });
  return opt_mult_ques;
};