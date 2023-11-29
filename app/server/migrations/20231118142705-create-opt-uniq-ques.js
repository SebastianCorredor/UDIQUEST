'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opt_uniq_ques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      texto: {
        type: Sequelize.STRING
      },createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Valor por defecto: fecha actual
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Valor por defecto: fecha actual al actualizar
      }
      
    }, {
      timestamps: false, // Esto desactiva los campos de timestamp
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('opt_uniq_ques');
  }
};