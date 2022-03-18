const { Router } = require('express');
const {get} = require('../controlers/gett');
const{idQuotes,modifyQuotes, getQuotes, addQuote, getStatus, producerQuotes, locationQuotes, clientQuotes,companyQuotes,dateQuotes, addQuoteStatus, getQuoteStatus} = require("../controlers/Quotes")
const{addCompany, addProducer,addDealer,getDealer,modifyProducer, addManager} = require("../controlers/adminControlers")
const {login, users} = require("../controlers/login")
const {getProducer, getProducerFilter} = require("../controlers/producer")
const {getCompany} = require("../controlers/company")
const {addPayment, getPayment, ClientPayment,  getDepositCashPayment, Deposit, dailyReport,getCashPayment, getUserPayment} = require("../controlers/payments")
const {getClients, addClient,modifyClient} = require("../controlers/clients");
const { getLocations, addLocations } = require('../controlers/location');
const {getCategories,  addCategories} = require("../controlers/categories")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();



router.get('/', get);
router.get('/Quotes', getQuotes);
router.get('/getStatus', getStatus);
router.get('/getUserPayment', getUserPayment);
router.get('/clients', getClients);
router.post('/modifyClient', modifyClient);
router.post('/modifyProducer', modifyProducer);
router.get('/users', users);
router.post('/modifyQuote', modifyQuotes);
router.post('/addCategories', addCategories);
router.post('/addQuoteStatus', addQuoteStatus);
router.get('/getQuoteStatus', getQuoteStatus);
router.get('/producerQuotes', producerQuotes);
router.get('/locationQuotes', locationQuotes);
router.get('/clientQuotes', clientQuotes);
router.get('/companyQuotes', companyQuotes);
router.get('/dateQuotes', dateQuotes);
router.get('/getDealer', getDealer);
router.get('/idquotes', idQuotes);
router.get('/getProducer', getProducer);
router.get('/getProducerFilter', getProducerFilter);
router.get('/getCompany', getCompany);
router.get('/getCashPayment', getCashPayment);
router.get('/dailyReport', dailyReport);

router.post('/addManager', addManager);
router.post('/login', login);
router.post("/addquote", addQuote);
router.post("/addcompany", addCompany);
router.post("/addproducer", addProducer);
router.post("/Deposit", Deposit);
router.post("/addDealer", addDealer);
router.post("/addClient", addClient);
router.post("/addPayment", addPayment)
router.post("/addClientPayment", ClientPayment)
router.get("/getpayments", getPayment), 



router.get("/getlocations", getLocations), 
router.post("/addlocation", addLocations), 

router.get("/getCategories", getCategories), 



 
module.exports = router;
