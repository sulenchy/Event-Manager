export default (sequelize, Sequelize) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
      },
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumber: true,
        notEmpty: true,
      },
    },
    cost: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        isNumber: true,
        notEmpty: true,
      },
    },
    facilities: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
      },
    },
    image: {
      type: Sequelize.BLOB,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
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
