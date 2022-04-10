const { DataTypes, NOW } = require('sequelize');

const DailyReport= (sequelize)=>{
    sequelize.define('DailyReport', {
        LocationId: {
            type:DataTypes.INTEGER,
        },
        total: {
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATEONLY,
            
            defaultValue: NOW,
        },
      
     
});
};
module.exports= DailyReport;