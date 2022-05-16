const server = require('./src/app.js');
const { sequelize } = require('./src/db')

 const {Pe}= require("./src/data/TWbackup")


// Syncing all the models at once.
sequelize.sync({ force: false }).then(() => {
  server.listen(8080, async()=>{
   
    try{
     
      //   Promise.all([Pe()])
      //   .then(res =>console.log("datos cargados!"))      
      
      //  console.log('%s listening at 4000'); 
      
    }
    catch(e){
       console.log("Error in sequelize.sinc, index.js: " + e)
    }
  });
});

