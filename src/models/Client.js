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
    new:{
        type:DataTypes.BOOLEAN
    },
    notes:{
        type: DataTypes.STRING,
    },
    deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    address:{
        type: DataTypes.STRING,
    },
    dateOfBirth:{
        type: DataTypes.STRING,
    },
    

   
});
};
module.exports= Client;