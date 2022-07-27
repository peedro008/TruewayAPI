const {Category} =require("../db")

const getCategories = async (req,res)=>{
    try{
        const Categories = await Category.findAll({
            attributes: {exclude:["createdAt", "modifiedAt"]},  
         
      
       })
       Categories.length?res.status(200).json(Categories):
        res.status(404).send("no Categories");
    }
    catch(e){
    console.log("Error in Categorasdies controller"+ e)
}
}
const addCategories = async (req,res)=>{
    let name = req.body.name
    let NSDvalue = req.body.NSDvalue
    try{
        const Categories = await Category.create({
            name: name,
            NSDvalue:NSDvalue
      
       })
      res.status(200).json(Categories)
    }
    catch(e){
    console.log("Error in Categories controller"+ e)
}
}

    

module.exports={getCategories, addCategories}