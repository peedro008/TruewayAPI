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
         type: DataTypes.INTEGER,
         allowNull: false
     },
    

    
    
    monthlyPayment:{
        type: DataTypes.INTEGER
    },
 
    NSDvalue:{
        type: DataTypes.INTEGER
    },
  
    PIPvalue:{
        type: DataTypes.INTEGER
        
    },
 
    MVRvalue:{
        type: DataTypes.INTEGER,
    },

    
  
   
  });
};
module.exports= Quote;