const { DataTypes } = require('sequelize');

const Users= (sequelize)=>{
    sequelize.define('Users', {
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
    UserName:{
         type:DataTypes.STRING,
         allowNull: false,
         unique: true
         
     },
    Password:{
        type:DataTypes.STRING,
         allowNull: false
    },
    UserRole:{
    type:DataTypes.ENUM("Admin", "Manager", "Producer"),
    allowNull:false
    },
    deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }   
});
};
module.exports= Users;