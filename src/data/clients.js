const {Client} = require("../db")

const createClient=()=>{
    Client.create({
        name:"Fernando Cabrera",
        email:"fernando@gmail.com",
        tel:351252545
       
    })
 

    Client.create({
        name:"Jorge Drexler",
        email:"jorge@gmail.com",
        tel:351252545
    })
 

    Client.create({
        name:"Osvaldo Fattoruso",
        email:"osvaldo@gmail.com",
        tel:35125213545
       
    })
 

    Client.create({
        name:"Diego Fernandez",
        email:"diego@gmail.com",
        tel:35125213545
       
    })
 

}


module.exports= {createClient};