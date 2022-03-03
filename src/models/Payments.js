
const { DataTypes, NOW } = require('sequelize');


const Payments= (sequelize)=>{
    sequelize.define('Payments', {
    LocationId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
    date:{
        type:DataTypes.DATEONLY,
         
         defaultValue: NOW,
         allowNull:false
    },
    time:{
        type: DataTypes.DATE,
        defaultValue: NOW
   },
    ClientId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    

    amount:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    method:{
        type:DataTypes.ENUM("credit/debit", "EFT", "Cash")
    },
    type:{
        type:DataTypes.ENUM("Monthly Payment", "Down Payment", "Endorsement", "Renew Down")
    },
    deposited:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    creditCardFee:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    total:{
        type:DataTypes.INTEGER
    }
  

});
};
module.exports= Payments;