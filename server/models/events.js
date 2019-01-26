export default (sequelize, Sequelize) => {
  const Events = sequelize.define('Events', {
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'title is required'
        }
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'Description is required'
        }
      },
    },
    event_type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'Event_type is required'
        }
      },
    },
    estimated_attendees: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'estimated_attendees is required'
        }
      },
    },
    event_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: true,
      validate: {
        isDate: {
          arg: true,
          msg: 'Date format is required'
        },
        notEmpty: {
          arg: true,
          msg: 'event_date is required'
        }
      },
    },
    lga: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'lga is required'
        }
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
