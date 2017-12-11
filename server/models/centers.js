export default (sequelize, Sequelize) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This center name is already taken, please enter a new center name',
      },
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
        isNumeric: {
          arg: true,
          msg: 'Capacity should be a number in integer'
        }
      },
    },
    cost: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: {
          arg: true,
          msg: 'Cost should be a number in decimal'
        }
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
      type: Sequelize.STRING,
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
