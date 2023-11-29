'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ques_topics', {
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
          model: 'questions', // Nombre de la tabla 'questions'
          key: 'id' // Columna 'id' de la tabla 'questions'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'topics', // Nombre de la tabla 'topics'
          key: 'id' // Columna 'id' de la tabla 'topics'
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
    await queryInterface.dropTable('ques_topics');
  }
};