export default (sequelize, Sequelize) => {
  const Events = sequelize.define('Events', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    event_type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
      },
    },
    estimated_attendees: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumber: true,
        notEmpty: true,
      },
    },
    event_date: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
      },
    },
    preferred_center: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /^[a-z]+$/i,
      },
    },
    lga: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
      },
    },
  });
  /* Event has a relationship with User and Center */
  Events.associate = (model) => {
    Events.belongsTo(model.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Events.belongsTo(model.Centers, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };
  return Events;
};
