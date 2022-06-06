const {  Payments, DailyReport,Location, Users, Client } = require("../db")  

const addDailyReport = async(req,res)=>{
    let LocationId = req.body.LocationId
   
    let IDs = req.body.IDs
    let total = req.body.total
    try{
        let DBdaily =await DailyReport.create({
            LocationId:LocationId,
            total:total
        })
        let upPay =await Payments.update(
            {DailyReportId:DBdaily.id},
            {
                where:{
                    id:IDs
                }
            }
            )
            DBdaily? res.status(200).json(DBdaily)
        :
        res.status(404).send("error in addDailyReport controller")
    }
    catch(e){
        console.log("Error in company controller"+ e)
    
}}
const resetDailyReport = async(req,res)=>{
    let IDs = req.body.IDs
    let dailyID = req.body.dailyID
    try{
        let upPay =await Payments.update(
            {DailyReportId:null},
            {
                where:{
                    id:IDs
                }
            }
            )
        let DBdaily =await DailyReport.destroy({
            where:{
                id:dailyID
            }
        })
        
            DBdaily? res.status(200).send("Done")
        :
        res.status(404).send("error in addDailyReport controller")
    }
    catch(e){
        console.log("Error in company controller"+ e)
    
}}
const getDailyReports = async (req,res)=>{
    try{
        const locations = await DailyReport.findAll({
            attributes: {exclude:[ "modifiedAt", "updatedAt"]},
            include:[
                {model:Payments,
                include:[Users,
                        Client,
                        Location
                ]},
                {model:Location},
                
             
            ],  
            
      
       })
       locations.length?res.status(200).json(locations):
        res.status(404).send("no DailyReport");
    }
    catch(e){
    console.log("Error in getDailyReport controller"+ e)
}
}
module.exports={
    addDailyReport,
    getDailyReports,
    resetDailyReport
}