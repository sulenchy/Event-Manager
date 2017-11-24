export default (sequelize, Sequelize) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cost: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    facilities: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: Sequelize.BLOB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
      },
    },
  });
    /* Center has a relationship with User and Event */
  Centers.associate = (model) => {
    Centers.belongsTo(model.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Centers.hasMany(model.Events, {
      foreignKey: 'centerId',
      as: 'events',
    });
  };
  return Centers;
};
