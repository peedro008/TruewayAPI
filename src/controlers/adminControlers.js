const {Company, Producer, Users, Dealer} = require("../db")
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const addCompany=async(req, res)=>{
    let name= req.body.name
    let email= req.body.email
    let phone = req.body.phone
    let address = req.body.address
    let CategoryId = req.body.CategoryId
    try{
        Company.create({
            name: name,
            email: email,
            phone: phone,
            address: address,
            CategoryId:CategoryId
        })
        res.status(200).send("Company Added")  
    }
    catch(e){
        console.log("Error in addCompany controller "+ e)  
        res.status(400).send("Error in addCompany controller ")     
    }
}
const addDealer=async(req, res)=>{
    let name= req.body.name
    let CompanyId= req.body.CompanyId
    try{
        Dealer.create({
            name: name,
            CompanyId:CompanyId
        })
        res.status(200).send("Dealer Added")  
    }
    catch(e){
        console.log("Error in addCompany controller "+ e)  
        res.status(400).send("Error in addCompany controller ")     
    }
}

const addProducer =async (req, res, next) => {
    let name= req.body.name
    let email= req.body.email
    let phone= req.body.phone
    let Password= req.body.Password
    let LocationId= req.body.LocationId
    let address= req.body.address
    // checks if email already exists
    Users.findOne({ where : {
        UserName: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.Password) {
            // password hash
            bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    let userBd= Users.create(({
                        name: name,
                        UserName: email,
                        Password: passwordHash,
                        UserRole:"Producer"
                        
                    }))
                    .then( Users=> Producer.create({
                        name: name,
                        email: email,
                        phone: phone,
                        LocationId: LocationId,
                        address: address,
                        UserId: Users.id
                    }))
                    
                    
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log("Error in signup controllers: " + err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};
// const addProducer=async(req, res)=>{
//     let name= req.body.name
//     let email= req.body.email
//     let phone= req.body.phone
//     let Password= req.body.Password
//     let LocationId= req.body.LocationId
//     let address= req.body.address
        
//     try{
//         Producer.create({
//             name: name,
//             email: email,
//             phone: phone,
//             LocationId: LocationId,
//             address: address
//         })
//         .then(
//             Users.create({
//                 name: name,
//                 UserName:email,
//                 Password:Password,
//                 UserRole:"Producer"
//             })

//         )
//         res.status(200).send("Producer Added")
//     }
    
//     catch(e){
//         console.log("Error in addProducer controller "+ e)   
//         res.status(400).send("Error in addProducer controller ")     
//     }
// }
const getDealer = async(req,res)=>{
    try{
        let dealer =await Dealer.findAll({})
        dealer.length? res.status(200).json(dealer)
        :
        res.status(404).send("no dealers")
    }
    catch(e){
        console.log("Error in dealer controller"+ e)
    
}}



const modifyProducer =async (req, res, next) => {
    let name= req.body.name
    let email= req.body.email
    let phone= req.body.phone
    let ProducerId= req.body.ProducerID
    let LocationId= req.body.LocationId
    let address= req.body.address
    let UserId= req.body.UserId
    let Password= req.body.Password
  
   
    if(!Password){const user =Users.update({
                       
                        name: name,
                        UserName: email,
                        
                       
                    }, {
                        where:{id:UserId}
                    })

                    .then(()=>{
                        Producer.update({
                            UserId: UserId,
                            LocationId:LocationId,
                            name: name,
                            email: email,
                            address: address,
                            phone: phone
                        },{
                        where:{id:ProducerId}
                    })

                    })
                    user.length?
                    res.status(200).send("ASDSAdasd")
                   :
                   res.status(404).send("no dealers")}
    else{
        bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
            if (err) {
                return res.status(500).json({message: "couldnt hash the password"}); 
            } else if (passwordHash) {
                const user =Users.update({
                       
                    name: name,
                    UserName: email,
                    
                   
                }, {
                    where:{id:UserId}
                })

                .then(()=>{
                    Producer.update({
                        UserId: UserId,
                        LocationId:LocationId,
                        name: name,
                        email: email,
                        address: address,
                        phone: phone
                    },{
                    where:{id:ProducerId}
                })

                })
                user.length?
                res.status(200).json(user)
               :
               res.status(404).send("no dealers")}
            
        })
        
                 
            
                    
          
              
    }   
          
   
};

module.exports={
    addCompany,
    addProducer,
    addDealer,
    getDealer,
    modifyProducer
}