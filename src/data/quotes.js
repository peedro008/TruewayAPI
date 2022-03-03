const {Quote, QuoteStatus} = require("../db")

const createQuotes=()=>{

    Quote.create({
        LocationId:1,
        ProducerId:2,
        ClientId:1,
        CompanyId:1,
        down:123,
        dealer:false,
        monthlyPayment: 1580,
        NSD: true,
        NSDvalue: 40,
        PIP: false,
        MVR: true,
        MVRvalue: 1500,
        CategoryId:1,
       

       
    })
   
  
    
}
const QuoteStatuss=()=>{
    QuoteStatus.create({
        note:"primera quote",
        Status:"Quoted",
        QuoteId:1
    })
    // QuoteStatus.create({
    //     note:"primera quoteprimera quoteprimera quoteprimera quoteprimera quoteprimera quote",
    //     Status:"Bound",
    //     QuoteId:1
    // })
}

//     Quote.create({
//         LocationId:1,
//         ProducerId:8,
//         ClientId:2,
//         CompanyId:2,
//         down:15000,
//         dealer:true,
//         dealerSalePerson:"Jose Luis Coto",
//         monthlyPayment: 1580,
//         NSD: true,
//         NSDvalue: 40,
//         PIP: true,
//         PIPvalue: 10,
//         MVR: true,
//         MVRvalue: 1500,
//         status: "Bound",
//         notes:"La venta fue realizada con exito",
//         CategoryId:1,
//     })
    
 

//     Quote.create({
//         LocationId:1,
//         ProducerId:2,
//         ClientId:3,
//         CompanyId:8,
//         down:15000,
//         dealer:true,
//         dealerSalePerson:"Jose Luis Coto",
//         monthlyPayment: 1580,
//         NSD: true,
//         NSDvalue: 40,
//         PIP: true,
//         PIPvalue: 10,
//         MVR: true,
//         MVRvalue: 1500,
//         status: "Bound",
//         notes:"La venta fue realizada con exito",
//         CategoryId:1,
       
//     })
 

//     Quote.create({
//         LocationId:1,
//         ProducerId:5,
//         ClientId:4,
//         CompanyId:10,
//         down:15000,
//         dealer:true,
//         dealerSalePerson:"Jose Luis Coto",
//         monthlyPayment: 1580,
//         NSD: true,
//         NSDvalue: 40,
//         PIP: true,
//         PIPvalue: 10,
//         MVR: true,
//         MVRvalue: 1500,
//         status: "Bound",
//         CategoryId:1,
//         notes:"La venta fue realizada con exito"
       
//     })
 

//     Quote.create({
//         LocationId:1,
//         ProducerId:2,
//         ClientId:2,
//         CompanyId:6,
//         down:15000,
//         dealer:true,
//         dealerSalePerson:"Jose Luis Coto",
//         monthlyPayment: 1580,
//         NSD: true,
//         CategoryId:1,
//         NSDvalue: 40,
//         PIP: true,
//         PIPvalue: 10,
//         MVR: true,
//         MVRvalue: 1500,
//         status: "Cancelation",
//         notes:"La no venta fue realizada con exito"
       
//     })
 

//     Quote.create({
//         LocationId:1,
//         ProducerId:4,
//         ClientId:1,
//         CompanyId:3,
//         down:15000,
//         CategoryId:1,
//         dealer:true,
//         dealerSalePerson:"Jose Luis Coto",
//         monthlyPayment: 1580,
//         NSD: true,
//         NSDvalue: 40,
//         PIP: true,
//         PIPvalue: 10,
//         MVR: true,
//         MVRvalue: 1500,
//         status: "Bound",
//         notes:"La venta fue realizada con exito"
       
//     })
//  }


module.exports= {createQuotes,QuoteStatuss};