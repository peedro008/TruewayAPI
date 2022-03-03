const { DataTypes } = require('sequelize');

const Location= (sequelize)=>{
    sequelize.define('Location', {
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
        email: {
            type:DataTypes.STRING
        },
        TEL: {
            type:DataTypes.FLOAT
        },
        address: {
            type:DataTypes.STRING
        }
   
});
};
module.exports= Location;