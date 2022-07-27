const { DataTypes } = require('sequelize');

const Category= (sequelize)=>{
    sequelize.define('Category', {
    name:{
        type:DataTypes.STRING,
        allowNull: false
     },
     NSDvalue:{
        type:DataTypes.INTEGER,
     }
   
    
});
};
module.exports= Category;