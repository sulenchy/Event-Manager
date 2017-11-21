module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      facilities: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: false,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },
  down: (queryInterface/* , Sequelize */) => {
    return queryInterface.dropTable('Centers');
  }
};