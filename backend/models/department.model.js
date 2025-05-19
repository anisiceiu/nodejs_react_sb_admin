module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
{
  timestamps: false // <--- disables createdAt and updatedAt
});

  Department.associate = (models) => {
    Department.hasMany(models.Employee, {
      foreignKey: 'DepartmentId',
      as: 'employees'
    });
  };

  return Department;
};