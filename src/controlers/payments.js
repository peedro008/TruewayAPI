const {  Producer, Payments, Client, Users, Location } = require("../db")  

const { Op } = require('sequelize');
;

const addPayment = async (req,res)=>{
    let { ClientId, LocationId, amount, method,type, creditCardFee, UserId} = req.body
    try{
        const pay = await Payments.create({
            ClientId: ClientId,
            LocationId: LocationId,
            amount: amount,
            method: method,
            type: type,
            UserId: UserId,
            creditCardFee:creditCardFee,
            total:creditCardFee? `${parseFloat(amount)+parseFloat(creditCardFee)}`: `${parseFloat(amount)}`,
            
        })
        res.status(200).json(pay)
    }
    catch(e){
        console.log("Error in addPayment controller "+ e)       
        res.status(400).send("Error in addPayment controller")
    }
}

const getUserPayment = async (req,res)=>{
    let papa=req.query.UserId
    try{
        const payments = await Payments.findAll({
            attributes: {exclude:[ "modifiedAt"]},  
            include:[
                {model:Client},
                {model:Users, where:{id: papa}},
                {model:Location}
            ],
            
      
       })
       payments.length?res.status(200).json(payments):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const getPayment = async (req,res)=>{
    try{
        const payments = await Payments.findAll({
            attributes: {exclude:[ "modifiedAt"]},  
            include:[
                {model:Client},
                {model:Users},
                {model:Location}
            ]
      
       })
       payments.length?res.status(200).json(payments):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}

const getCashPayment = async (req,res)=>{
    const papa = req.query.UserId
    try{
        const payments = await Payments.findAll({
            attributes: {exclude:[ "modifiedAt"]},  
            where:{deposited: false},
            include:[
                {model:Client},
                {model:Users,
                    where:{id: papa}},
                {model:Location}
            ]
      
       })
       payments.length?res.status(200).json(payments):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const getDepositCashPayment = async (req,res)=>{
    const UserId = req.query.UserId
    try{
        const payments = await Payments.findAll({
            attributes: {exclude:[ "modifiedAt"]},  
            where:{
                deposited: false,
                UserId:UserId,
                method: "Cash"},
            include:[
                {model:Client},
                {model:Users},
                {model:Location}
            ]
      
       })
       payments.length?res.status(200).json(payments):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in payments controller"+ e)
}
}
const dailyReport=async(req,res)=>{
    
    let date = new Date().toJSON();
    let ated = date.substring(0,10)
    try{
        let PaymentsDB=await Payments.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Users},
            {model:Location}
        ],
        where:{
            date:ated,
            
        }
        
        
        
    })
        
  
    PaymentsDB.length?res.status(200).json(PaymentsDB):
        res.status(404).send("no Payments");
    }
    catch(e){
    console.log("Error in Payments controller"+ e)
}
}

const ClientPayment =  (req, res) => {
    let { LocationId, amount, method,type, creditCardFee, UserId,  name, email, phone} = req.body
    try{
        const client =  Client.create({
            name: name,
            email: email,
            tel: phone
        })

        .then(Client=>{
            const pay =  Payments.create({
                ClientId: Client.id,
                LocationId: LocationId,
                amount: amount,
                method: method,
                type: type,
                UserId: UserId,
                creditCardFee:creditCardFee&&creditCardFee,
                total:creditCardFee? `${parseFloat(amount)+parseFloat(creditCardFee)}`: `${parseFloat(amount)}`,
                
            })
        })
        client?res.status(200).json(client):
        res.status(404).send("Payment error");
    }
    catch(e){
        console.log("Error in payments controller"+ e)
    }
}
const Deposit=async(req, res)=>{
    let id= req.body.id

    
    
    try{
      
            let pay= await Payments.update({deposited: true}, {
                where:{
                    id:{
                        [Op.in]: id  
                    }     
                 }
            })
          
            res.status(200).json(pay)
        }
        
    
    catch(e){
        console.log("Error in deposit"+ e)
    }







}

    

module.exports={addPayment,getUserPayment , getPayment, ClientPayment, getDepositCashPayment,Deposit, dailyReport,getCashPayment}