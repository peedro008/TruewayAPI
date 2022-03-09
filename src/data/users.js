const {Users} = require("../db")

const admin =function(){
    Users.create({
        name:"Admin",
        UserName: "admin",
        Password: "$2a$12$289tRMBxX4ca/jP1om1pReZFCGd/PYAvVcA6H1HkNqMHn4uq7tCnW",
        UserRole: "Admin",
    })
} 

// const Manager =function(){
//     Users.create({
//         name:"Manager",
//         UserName: "manager",
//         Password: "$2a$12$X8.UX9uC8rAs/SJ39ysII.HUZU6wND3cuAX2DXWD0bU.koadOKrRy",
//         UserRole: "Manager",
//     })
// } 
// const Producer =function(){
//     Users.create({
//         name:"Producer",
//         UserName: "Producer",
//         Password: "$2a$12$X8.UX9uC8rAs/SJ39ysII.HUZU6wND3cuAX2DXWD0bU.koadOKrRy",
//         UserRole: "Producer",
//     })
//} 
module.exports= {admin, };