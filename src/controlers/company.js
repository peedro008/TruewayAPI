const {  Company } = require("../db")  

const getCompany = async(req,res)=>{
    try{
        let companies =await Company.findAll({})
        companies.length? res.status(200).json(companies)
        :
        res.status(404).send("no companies")
    }
    catch(e){
        console.log("Error in company controller"+ e)
    
}}
module.exports={
    getCompany
}