module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    Position: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Salary: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    HireDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'Id'
      }
    }
  },
{
  timestamps: false // <--- disables createdAt and updatedAt
});

  Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
      foreignKey: 'DepartmentId',
      as: 'department'
    });
  };

  return Employee;
};