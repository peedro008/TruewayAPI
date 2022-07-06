

const get=async(req,res)=>{
    try{
       res.status(200).send("200");
    }
    catch(e){
        console.log("Error in category controller "+ e)
    }

};

module.exports={
    get
}