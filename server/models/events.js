export default (sequelize, Sequelize) => {
  const Events = sequelize.define('Events', {
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    event_type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    estimated_attendees: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    event_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: true,
      validate: {
        isDate: true,
        notEmpty: true,
      },
    },
    lga: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
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
