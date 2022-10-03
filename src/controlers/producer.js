const { Producer, Manager, Users } = require("../db");

const getProducerFilter = async (req, res) => {
  let ID = req.query.Id;
  let UserRole = req.query.UserRole;

  try {
    if(UserRole=="Producer"){
    let QuotesDB = await Producer.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      
      where: { UserId: ID }
    });
    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");}
      if(UserRole=="Manager"){
        let QuotesDB = await Manager.findAll({
          attributes: { exclude: ["createdAt", "modifiedAt"] },
          
          where: { UserId: ID } 
        });
        QuotesDB.length
          ? res.status(200).json(QuotesDB)
          : res.status(404).send("no Quotes");}
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const getProuducerUser = async (req, res) => {
  let UserId = req.query.UserId;

  try {
    let QuotesDB = await Producer.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },

      where: { UserId: UserId },
    });
    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : (QuotesDB = await Manager.findAll({
          attributes: { exclude: ["createdAt", "modifiedAt"] },

          where: { UserId: UserId },
        }));
    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("404");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const getProducer = async (req, res) => {
  try {
    let QuotesDB = await Producer.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Users }],
      where: { deleted: false },
    });
    let manager = await Manager.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Users }],
      where: { deleted: false },
    });
    let pes = [];
    manager.map((e) => {
      pes.push(e);
    });
    QuotesDB.map((e) => {
      pes.push(e);
    });

    pes.length ? res.status(200).json(pes) : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const getOnlyProducer = async (req, res) => {
    try {
      let QuotesDB = await Producer.findAll({
        attributes: { exclude: ["createdAt", "modifiedAt"] },
        include: [{ model: Users }],
        where: { deleted: false },
      });
     
  
      QuotesDB.length ? res.status(200).json(QuotesDB) : res.status(404).send("no Producer");
    } catch (e) {
      console.log("Error in Producer controller" + e);
    }
  };
const getManager = async (req, res) => {
  try {
    let QuotesDB = await Manager.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Users }],
      where: { deleted: false },
    });
    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};

const deleteProducer = async (req,res)=>{
    let ProducerId= req.body.ProducerId
try{
    const deleted = await Producer.update({deleted:true},
        {where:{id:ProducerId }})
   res.status(200).json(deleted)
}
catch(e){
console.log("Error in deleteProducer controller"+ e)
}
}
const undeleteProducer = async (req,res)=>{
let ProducerId= req.body.ProducerId
try{
const deleted = await Producer.update({deleted:false},
    {where:{id:ProducerId }})
res.status(200).json(deleted)
}
catch(e){
console.log("Error in deletePayment controller"+ e)
}
}
module.exports = {
  getProducer,
  getProuducerUser,
  deleteProducer,
  undeleteProducer,
  getProducerFilter,
  getManager,
  getOnlyProducer
};
