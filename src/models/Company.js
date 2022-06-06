const { DataTypes } = require('sequelize');

const Company= (sequelize)=>{
    sequelize.define('Company', {
    
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
});
};
module.exports= Company;