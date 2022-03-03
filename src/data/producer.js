const { Producer} = require("../db")



const Pe =function(){
  Producer.create({
    name:"Producer",
    email:"Producer",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Pedro Sánchez",
    email:"pedro@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Franca Vagliera",
    email:"franca@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Manuel Sánchez",
    email:"manuel@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Candela Sosa",
    email:"cande@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Julian Perez",
    email:"julian@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Candelaria Macedo",
    email:"candeMaceo@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })

  Producer.create({
    name:"Josefina Lopez",
    email:"jose@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Pablo Neruda",
    email:"pablo@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
  Producer.create({
    name:"Francisco Goya",
    email:"francisco@gmail.com",
    phone:"3515330625",
    address:"Simon Bolivar 655, Cordoba, Argentina"
  })
} 

module.exports= { Pe };

