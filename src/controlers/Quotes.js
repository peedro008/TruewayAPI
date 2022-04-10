
const { Quote, Client, Company, Category,   Location, Users, QuoteStatus, Dealer } = require("../db")
const {Op, Sequelize} = require('sequelize');






const getQuotes=async(req,res)=>{
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Company},
            {model:Users},
            {model:QuoteStatus,
                order: [['date', 'ASC'], [QuoteStatus, 'id', 'ASC' ]],
                
                include:[Users]},
            {model:Dealer},
            {model:Location},
            {model:Category},
           
        ],
        order: [['date', 'ASC'], [QuoteStatus, 'id', 'ASC' ]],
        where:{
            deleted:false
        }
       })
        QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const getDeletedQuotes=async(req,res)=>{
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Company},
            {model:Users},
            {model:QuoteStatus,
                order: [['date', 'ASC'], [QuoteStatus, 'id', 'ASC' ]],
                
                include:[Users]},
            {model:Dealer},
            {model:Location},
            {model:Category},
           
        ],
        order: [['date', 'ASC'], [QuoteStatus, 'id', 'ASC' ]],
        where:{
            deleted:true
        }
       })
        QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const addQuote = async(req,res)=>{
    let dealerId= req.body.DealerId
    let MVRvalue= req.body.MVRvalue
    let LocationId= req.body.LocationId
    let CategoryId= req.body.CategoryId
    let notes= req.body.notes
    let ClientId=req.body.ClientId
    let clientName= req.body.name
    let clientEmail= req.body.email
    let Tel= req.body.tel
    let CompanyId= req.body.CompanyId
    let UserId= req.body.UserId
    let down = req.body.down
    let dealer= req.body.dealer
    let bound= req.body.Bound
    let monthlyPayment= req.body.monthlyPayment
    let neww= req.body.new
    let NSDvalue= req.body.NSDvalue
    let TotalPremium= req.body.TotalPremium
    let ClientNotes = req.body.notes
    let PIPvalue= req.body.PIPvalue
    

    

    try{
     
        if(!ClientId){

        
       
        await Client.create({
            name: clientName,
            email: clientEmail,
            tel: Tel,
            new:neww,
            notes:ClientNotes
            })
        .then(Client=>
            Quote.create({
                ClientId: Client.id,
                CompanyId: CompanyId,
                CategoryId: CategoryId,
                UserId: UserId,
                LocationId: LocationId,
                down: down,
                dealer: dealer,
                dealerId: dealerId,
                monthlyPayment: monthlyPayment,
                totalPremium:TotalPremium,
                NSDvalue: NSDvalue,
               
                PIPvalue: PIPvalue,
               
                MVRvalue: MVRvalue,
               
            })
            .then(Quote=>{
                QuoteStatus.create({
                    note: notes,
                    Status: bound? "Sold" : "Quoted",
                    QuoteId: Quote.id,
                    UserId: UserId
                })
            })
        ) 
    
        
     
     res.status(200).send("Quote Added") }

    else{
        Quote.create({
            ClientId: ClientId,
            CompanyId: CompanyId,
            CategoryId: CategoryId,
            UserId: UserId,
            LocationId: LocationId,
            down: down,
            dealer: dealer,
            dealerId: dealerId,
            monthlyPayment: monthlyPayment,
            totalPremium:TotalPremium,
            NSDvalue: NSDvalue,
            
            PIPvalue: PIPvalue,
            
            MVRvalue: MVRvalue,
           
        })
        .then(Quote=>{
            QuoteStatus.create({
                note: notes,
                Status: bound? "Sold" : "Quoted",
                QuoteId: Quote.id,
                UserId: UserId
            })
        })
     

    
 
 res.status(200).send("Quote Added")
    }

    }
            
    catch(e){
        console.log("Error in addQuote controller "+ e)       
        res.status(400).send("Error in addQuote controller ")
    }
}

const locationQuotes=async(req,res)=>{
    let papa=req.query.location
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Company},
            {model:Users},
         
        ],
        
        where:{location: papa,
               deleted:true}
        
        
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Cancelations");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const addQuoteStatus=async(req, res)=>{
    let notes= req.body.note
    let Status= req.body.Status
    let QuoteId= req.body.QuoteId
    try{
        let quoteStatus=
            await QuoteStatus.create({
            note: notes,
            Status: Status,
            QuoteId: QuoteId
            })
            res.status(200).json(quoteStatus)
            
    }
    catch(e){
        console.log("Error in Quote quoteStatus"+ e)
    }
}
const producerQuotes=async(req,res)=>{
    let papa=req.query.UserId
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
           
            
            {model:Users,
            where:{id: papa}},
            {model:Client},
            {model:Company},
            
            {model:QuoteStatus},
            {model:Dealer},
            {model:Location},
            {model:Category},
            
        ],
        
        
        
        where:{
            deleted:false
        }
        
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const companyQuotes=async(req,res)=>{
    let papa=req.query.company
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Company,
                where:{name: papa}},
            {model:Users},
            
        ],
        
        
        
        where:{
            deleted:false
        }
        
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const clientQuotes=async(req,res)=>{
    let papa=req.query.client
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client,
                where:{name: {
                    [Op.substring]: Sequelize.literal(papa)
                  }
                  
                }},
            {model:Company},
            {model:Users},
       
        ],
        
        
        where:{
            deleted:false
        }
        
        
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Cancelations");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}
const dateQuotes=async(req,res)=>{
    let papa=req.query.date
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        include:[
            {model:Client},
            {model:Company},
            {model:Users},
            
        ],
        where:{
            date:papa,
            deleted:false
        }
        
        
    
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Cancelations");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}
}

const getQuoteStatus= async(req,res)=>{
    let QuoteId=req.query.QuoteId
   
    try{
        let QuoteStatus=await QuoteStatus.findAll({
            attributes: {exclude:["modifiedAt"]},  
        include:[
            {model:Quote},
            {model:Company},
            
            
        ],
        where:{
            QuoteId:QuoteId
        }
        
        
        
    })
        
  
    QuoteStatus.length?res.status(200).json(QuoteStatus):
        res.status(404).send("no QuoteStatus");
    }
    catch(e){
    console.log("Error in QuoteStatus controller"+ e)
}
}
const getStatus= async(req,res)=>{
    
   
    try{
        let quoteStatus=await QuoteStatus.findAll({
            attributes: {exclude:["modifiedAt"]},  
        include:[
            {model:Quote},
            {model:Users}
         
            
            
        ],
       
        
        where:{
            deleted:false
        }
        
        
    })
        
  
    quoteStatus.length?res.status(200).json(quoteStatus):
        res.status(404).send("no QuoteStatus");
    }
    catch(e){
    console.log("Error in QuoteStatus controller"+ e)
}
}

const idQuotes=async(req,res)=>{
    var ID=req.query.id
   
    try{
        let QuotesDB=await Quote.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
        where:{
            id:ID,
            deleted:false
        },
        include:[
            {model:Client},
            {model:Company},
            {model:Users},
            {model:QuoteStatus,
            include:[Users]},
            {model:Location}
            

        ]
        
        
        
    })
        
  
       QuotesDB.length?res.status(200).json(QuotesDB):
        res.status(404).send("no Quotes");
    }
    catch(e){
    console.log("Error in Quote controller"+ e)
}

}
const modifyQuotes=async(req, res)=>{
    let notes= req.body.note
    let Status= req.body.Status
    let QuoteId= req.body.QuoteId
    let monthly= req.body.monthly
    let down= req.body.down
    let UserId= req.body.UserId
    
    
    try{
        if(Status=="Cancelled"){
            let quoteStatus=
                await QuoteStatus.create({
                note: notes,
                Status: Status,
                QuoteId: QuoteId,
                UserId: UserId
                })
                res.status(200).json(quoteStatus)
         }
         else{
            let quote= await Quote.update({down: down, monthlyPayment: monthly}, {
                where:{
                    id: QuoteId
                 }
            })
            let quoteStatus= await QuoteStatus.create({
            note: notes,
            Status: Status,
            QuoteId: QuoteId,
            UserId: UserId
            })  
            res.status(200).json(quote)
        }
        
    }
    catch(e){
        console.log("Error in Quote quoteStatus"+ e)
    }







}
const deleteQuote = async (req,res)=>{
    let QuoteId= req.body.QuoteId
try{
    const deleted = await Quote.update({deleted:true},
        {where:{id:QuoteId }})
    const statusDeleted = await QuoteStatus.update({deleted:true},
        {where:{QuoteId:QuoteId }})
   res.status(200).json(deleted, statusDeleted)
}
catch(e){
console.log("Error in deleteQuote controller"+ e)
}
}
const undeleteQuote = async (req,res)=>{
    let QuoteId= req.body.QuoteId
try{
    const deleted = await Quote.update({deleted:false},
        {where:{id:QuoteId }})
    const statusDeleted = await QuoteStatus.update({deleted:false},
        {where:{QuoteId:QuoteId }})
   res.status(200).json(deleted, statusDeleted)
}
catch(e){
console.log("Error in deleteQuote controller"+ e)
}
}

module.exports={
    getQuotes,
    producerQuotes,
    companyQuotes,
    clientQuotes,
    addQuote,
    locationQuotes,
    addQuoteStatus,
    getQuoteStatus,
    dateQuotes,
    idQuotes,
    modifyQuotes,
    getStatus,
    deleteQuote,
    undeleteQuote,
    getDeletedQuotes}