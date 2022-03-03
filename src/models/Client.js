const { DataTypes } = require('sequelize');

const Client= (sequelize)=>{
    sequelize.define('Client', {
    name:{
         type:DataTypes.STRING,
         allowNull: false
     },
    tel:{
         type: DataTypes.FLOAT,
         allowNull: false
     },
    email:{
         type: DataTypes.STRING,
    },
   
});
};
module.exports= Client;