const { DataTypes, NOW } = require('sequelize');

const QuoteStatus= (sequelize)=>{
    sequelize.define('QuoteStatus', {
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        QuoteId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        note: {
            type:DataTypes.TEXT,
        },
        Status:{
            type:DataTypes.ENUM("Quoted", "Cancelled", "Renew down", "Sold", "Re-install" ),
            default: "Quoted",
            
                      
        },
        date:{
            type:DataTypes.DATEONLY,
            
            defaultValue: NOW,
        },
 
});
};
module.exports= QuoteStatus;