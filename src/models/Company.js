const { DataTypes } = require('sequelize');

const Company= (sequelize)=>{
    sequelize.define('Company', {
 
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: false
    },
    address:{
        type:DataTypes.STRING,
        allowNull: false
    },
 
});
};
module.exports= Company;