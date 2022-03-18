const server = require('./src/app.js');
const { sequelize } = require('./src/db')
 const{ admin , Manager, Producer}=require("./src/data/users")
// const{ Pe}=require("./src/data/producer")
 const{ createLocations}=require("./src/data/location")
// const{Health, Auto, Comercial, Home}=require("./src/data/categories")
// const{createCompanies}=require("./src/data/companies")
// const{createQuotes, QuoteStatuss}=require("./src/data/quotes")
// const{createClient}=require("./src/data/clients")

// Syncing all the models at once.
sequelize.sync({ force: false }).then(() => {
  server.listen(8080, async()=>{
   
    try{
     
      // Promise.all([admin(),createLocations()])
      //  .then(res =>console.log("datos cargados!"))      
      
       console.log('%s listening at 4000'); // 
      
    }
    catch(e){
       console.log("Error in sequelize.sinc, index.js: " + e)
    }
  });
});

