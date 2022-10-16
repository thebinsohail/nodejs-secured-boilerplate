'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return {...this.get(),userId:undefined,password:undefined}
    }
  }
  User.init({
    userId: {type:DataTypes.BIGINT,allowNull:false,autoIncrement:true,primaryKey:true},
    email: {type:DataTypes.STRING,allowNull:false},
    userName:{type: DataTypes.STRING,allowNull:false},
    password: {type:DataTypes.STRING,allowNull:false},
    role: {type:DataTypes.STRING,allowNull:false}  
  }, {
    sequelize,
    tableName:"user",
    modelName: 'User',
  });
  return User;
};