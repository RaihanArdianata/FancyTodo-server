'use strict';

const {encode} = require('../helper/bycript.js')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isUniqe (email, done){
          User.findOne({
            where: {
              email : email
            }
          })
          .done(function(result){
            if(result){
              done(new Error('Email already in use')) 
            }
            done()
          })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encode(user.password);
      }
    },
    sequelize })

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};