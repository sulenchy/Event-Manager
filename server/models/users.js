export default (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address',
        },
        isLowercase: {
          msg: 'your email must be in lowercase',
        },
      },
      unique: {
        args: true,
        msg: 'This email is already taken, enter a new email address',
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      userType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-z]+$/i,
          notEmpty: true,
        },
      },
    },
  });
  /* User has a relationship with centers and events */
  Users.associate = (model) => {
    Users.hasMany(model.Events, {
      foreignKey: 'userId',
      as: 'events',
    });
    Users.hasMany(model.Centers, {
      foreignKey: 'userId',
      as: 'centers',
    });
  };
  return Users;
};
