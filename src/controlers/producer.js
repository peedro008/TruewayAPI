const {Producer,  Location, Users} = require("../db")


const getProducerFilter=async(req,res)=>{
    let ID = req.query.Id
    let name = req.query.name

      try{
          
        let QuotesDB=await Producer.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
    
        where:ID?{ id: ID}:{name:name}
                
       })
        QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const getProducer=async(req,res)=>{
    

      try{
          
        let QuotesDB=await Producer.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
            include:[
                
                {model:Users},
               
            ],
      
   
       })
        QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
module.exports={
    getProducer,
    getProducerFilter}