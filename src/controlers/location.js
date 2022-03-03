const {Location} =require("../db")

const getLocations = async (req,res)=>{
    try{
        const locations = await Location.findAll({
            attributes: {exclude:["createdAt", "modifiedAt", "updatedAt"]},  
         
      
       })
       locations.length?res.status(200).json(locations):
        res.status(404).send("no Location");
    }
    catch(e){
    console.log("Error in location controller"+ e)
}
}
const addLocations = async (req,res)=>{
    let { name, email, address, TEL} = req.body
    try{
        const locations = await Location.create({
            name:name,
            email:email,
            TEL:TEL,
            address:address  
         
      
       })
       res.status(200).json(locations)
        
    }
    catch(e){
    console.log("Error in location controller"+ e)
}
}
    

module.exports={getLocations,addLocations}