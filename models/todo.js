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
      description:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `the description cant null`
          },
          notEmpty: {
            msg: `the description cant empty`
          }
        }
      },
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          checkDueDate() {
            if (this.due_date < new Date()) {
              throw new Error('Error Date cant less than current date')
            }
          },
          notNull: {
            msg: `the due date cant null`
          }
        }
      },
      UserId: DataTypes.INTEGER
    }, {
      hooks: {
        beforeCreate: (todo, options) => {
          if(!todo.status){
            todo.status = false;
          }
        }
      },
    sequelize
  }
  )

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};