const {Location} = require("../db")

const createLocations=()=>{
    Location.create({
        name:"TW1",
       
    })
 

    Location.create({
        name:"TW2",
       
    })
 

    Location.create({
        name:"TW3",
       
    })
 

    Location.create({
        name:"TW4",
       
    })
 

    Location.create({
        name:"TW5",
       
    })
 

    Location.create({
        name:"TW6",
       
    })
 }


module.exports= {createLocations};