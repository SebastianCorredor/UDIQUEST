'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students', // Nombre de la tabla 'students'
          key: 'id' // Columna 'id' de la tabla 'students'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'surveys', // Nombre de la tabla 'surveys'
          key: 'id' // Columna 'id' de la tabla 'surveys'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('student_surveys');
  }
};