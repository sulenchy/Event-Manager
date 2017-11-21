module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimated_attendees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      centerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId',
        },
      },
    }); 
  },
  down: (queryInterface /* , Sequelize */) => {
    return queryInterface.dropTable('Events');
  }
};
