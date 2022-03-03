const {Company, Dealer} = require("../db")

const createCompanies =function(){
    Company.create({
        name:"Gainsco",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })


    Company.create({
        name:"Foremost",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
 
    Company.create({
        name:"Progresive",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })

    Company.create({
        name:"Pro-general",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"Citizen",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })


    Company.create({
        name:"Avatar",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
 
    Company.create({
        name:"Universal",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })

    Company.create({
        name:"Granada",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"Abco",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })


    Company.create({
        name:"Infinity",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
 
    Company.create({
        name:"Dairy Land",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })

    Company.create({
        name:"United Auto",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    
    Company.create({
        name:"National General",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    
    Company.create({
        name:"Ocean Harbor",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    
    Company.create({
        name:"Southern",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"Responsive",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"Renaissance",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"Hiscox Ins Co Inc",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Company.create({
        name:"United Speciality",
        email:"example@gmail.com",
        phone: "351111111",
        address: "example",
        CategoryId: 2
       
    })
    Dealer.create({
        name: "Jacinto Piedras",
    })

} 
module.exports= {createCompanies};