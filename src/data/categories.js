const {Category} = require("../db")

const Home =function(){
    Category.create({
        name:"Home",
       
    })
} 
const Comercial =function(){
    Category.create({
        name:"Comercial",
       
    })
} 
const Auto =function(){
    Category.create({
        name:"Auto",
       
    })
} 
const Health =function(){
    Category.create({
        name:"Health",
       
    })
} 

module.exports= {Health, Auto, Comercial, Home};