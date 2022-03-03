const { DataTypes } = require('sequelize');

const Dealer= (sequelize)=>{
    sequelize.define('Dealer', {
        name: {
            type:DataTypes.TEXT,
        },
        CompanyId:{
            type:DataTypes.INTEGER,
        }
     
});
};
module.exports= Dealer;