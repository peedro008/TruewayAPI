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
    DealerId:{
        type:DataTypes.INTEGER,
        allowNull:true
        
    },
    date:{
         type:DataTypes.DATEONLY,
         
         defaultValue: NOW,
     },
     time:{
        type:DataTypes.DATE,
        
        defaultValue: NOW,
        
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