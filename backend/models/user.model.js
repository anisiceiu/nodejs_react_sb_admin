module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
  timestamps: false // <--- disables createdAt and updatedAt
});

  return User;
};