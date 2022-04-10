const {Client} =require("../db")

const getClients = async (req,res)=>{
    try{
        const Clients = await Client.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
            where:{deleted:false}
      
       })
       Clients.length?res.status(200).json(Clients):
        res.status(404).send("no Clients");
    }
    catch(e){
    console.log("Error in Clients controller"+ e)
}
}
const getDeletedClients = async (req,res)=>{
    try{
        const Clients = await Client.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
            where:{deleted:true}
      
       })
       Clients.length?res.status(200).json(Clients):
        res.status(404).send("no Clients");
    }
    catch(e){
    console.log("Error in Clients controller"+ e)
}
}
const addClient = async (req,res)=>{
    let name= req.body.name
    let Tel= req.body.tel
    let email= req.body.email
    let neww= req.body.new
    let notes = req.body.notes
    let address = req.body.address
    let dateOfBirth= req.body.dateOfBirth

    try{
        const Clientt = await Client.create({
            name:name,
            tel:Tel,
            email:email,
            new:neww,
            notes:notes,
            address:address,
            dateOfBirth:dateOfBirth
         
      
       })
       res.status(200).json(Clientt)
    }
    catch(e){
    console.log("Error in addClient controller"+ e)
}
}
const modifyClient = async (req,res)=>{
    let name= req.body.name
    let Tel= req.body.Tel
    let email= req.body.email
    let neww = req.body.new
    let ClientId= req.body.ClientId
    let notes = req.body.notes
    try{
        const payments = await Client.update({name:name,Tel:Tel,email:email, new:neww, notes:notes},
            {where:{id:ClientId }})
       res.status(200).json(payments)
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const deleteClient = async (req,res)=>{
        let ClientId= req.body.ClientId
    try{
        const deleted = await Client.update({deleted:true},
            {where:{id:ClientId }})
       res.status(200).json(deleted)
    }
    catch(e){
    console.log("Error in clientDelete controller"+ e)
}
}
const undeleteClient = async (req,res)=>{
    let ClientId= req.body.ClientId
try{
    const deleted = await Client.update({deleted:false},
        {where:{id:ClientId }})
   res.status(200).json(deleted)
}
catch(e){
console.log("Error in clientDelete controller"+ e)
}
}

    

module.exports={getClients,addClient,modifyClient, deleteClient,undeleteClient, getDeletedClients}