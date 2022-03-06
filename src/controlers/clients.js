const {Client} =require("../db")

const getClients = async (req,res)=>{
    try{
        const payments = await Client.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
         
      
       })
       payments.length?res.status(200).json(payments):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const addClient = async (req,res)=>{
    let name= req.body.name
    let Tel= req.body.tel
    let email= req.body.email
    try{
        const payments = await Client.create({
            name:name,
            tel:Tel,
            email:email 
         
      
       })
       res.status(200).json(payments)
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const modifyClient = async (req,res)=>{
    let name= req.body.name
    let Tel= req.body.Tel
    let email= req.body.email
    let ClientId= req.body.ClientId
    try{
        const payments = await Client.update({name:name,Tel:Tel,email:email},
            {where:{id:ClientId }})
       res.status(200).json(payments)
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}

    

module.exports={getClients,addClient,modifyClient}