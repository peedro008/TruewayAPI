const { DataTypes, NOW } = require('sequelize');


const Quote= (sequelize)=>{
    sequelize.define('Quote', {
    LocationId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    CategoryId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ClientId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    CompanyId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    DealerSalePersonId:{
        type:DataTypes.INTEGER,
        allowNull:true
        
    },
    date:{
         type:DataTypes.DATEONLY,
         defaultValue: NOW,
     },
     effectiveDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    expirationDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    policyNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
     time:{
        type:DataTypes.DATE,
        defaultValue: NOW,
    },
    closingDate:{
        type:DataTypes.DATE,
        
        defaultValue: null,
        
    },
    SoldBy:{
        type:DataTypes.INTEGER,
        
        defaultValue: null,
        
    },
    down:{
         type: DataTypes.STRING,
         allowNull: false
     },
    totalPremium:{
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    
    monthlyPayment:{
        type: DataTypes.STRING
    },
    NSDamount:{
        type: DataTypes.STRING,
        defaultValue:""
    },
    NSDvalue:{
        type: DataTypes.STRING
    },
  
    PIPvalue:{
        type: DataTypes.STRING
        
    },
 
    MVRvalue:{
        type: DataTypes.STRING,
    },

    
  
   
  });
};
module.exports= Quote;