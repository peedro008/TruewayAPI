const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const {Users} =require("../db")


const login = (req, res, next) => {
    // checks if email exists
   
    Users.findOne({ where : {
        UserName: req.body.UserName, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "User not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.Password, dbUser.Password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "Error"});
                } else if (compareRes) { // password match
                    console.log(dbUser)
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "User logged in", "token": token, UserRole: dbUser.UserRole, userId:dbUser.id, Name:dbUser.name});
                } else { // password doesnt match
                    res.status(401).json({message: "Invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('Error in login controllers: ' + err);
    });
};



const resetPass = (req, res, next) => {
    // checks if email exists
   
    let UserName = req.body.UserName;
  
  
    bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
        if (err) {
          return res.status(500).json({ message: "couldnt hash the password" });
        } else if (passwordHash) {
          console.log(passwordHash);
          const user = Users.update(
            {
              Password: passwordHash,
            },
            {
              where: { UserName: UserName },
            }
          )
          user
            ? res.status(200).json(user)
            : res.status(404).send("Error");
        }
      });
    }


const users = async(req, res)=>{
    try{
        let dbUsers = await Users.findAll({
        where: {id: {[sequelize.Op.not]: 8}}, 
        atributtes:["UserName"]
    }
        
    )
    dbUsers.length? res.status(200).json(dbUsers):
    res.status(404).send("nada")
}
catch{
    res.status(400).send("error")
} 
}

module.exports={
    login,
    users,
    resetPass
}
