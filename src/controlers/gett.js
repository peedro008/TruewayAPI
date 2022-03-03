

const get=async(req,res)=>{
    try{
       res.status(200).send("ANDA PERRO");
    }
    catch(e){
        console.log("Error in category controller "+ e)
    }

};

module.exports={
    get
}