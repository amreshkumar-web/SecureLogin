const { DataTypes } = require("sequelize");

const sequelize = require("../dbConnect");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
 name:{
   type:DataTypes.STRING,
   allowNull:false,
 },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
  timestamps: true 
});



module.exports = User; 