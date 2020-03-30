'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Todo extends Model { }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `the title cant null`
          },
          notEmpty: {
            msg: `the title cant empty`
          }
        }
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          checkDueDate() {
            if (this.due_date < new Date()) {
              throw new Error('Error Date cant less than current date')
            }
          }
        }
      }
    }, {
    sequelize
  }
  )

  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};