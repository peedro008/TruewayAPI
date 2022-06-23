const { Router } = require("express");
const { get } = require("../controlers/gett");
const {
  idQuotes,
  modifyQuotes,
  getQuotes,
  addNotes,
  undeleteQuote,
  addQuote,
  getStatus,
  producerQuotes,
  locationQuotes,
  clientQuotes,
  companyQuotes,
  dateQuotes,
  addQuoteStatus,
  getQuoteStatus,
  deleteQuote,
  getDeletedQuotes,
} = require("../controlers/Quotes");
const {
  addCompany,
  addProducer,
  addDealerSalePerson,
  getDealerSalePerson,
  modifyProducer,
  addManager,
  modifyManager,
  deleteManager,
  undeleteManager,
  getDeletedManager,
  getDeletedProducer,
} = require("../controlers/adminControlers");
const { login, users } = require("../controlers/login");
const {
  getProducer,
  getProducerFilter,
  getManager,
  getProuducerUser,
  getOnlyProducer,
  deleteProducer,
  undeleteProducer,
} = require("../controlers/producer");
const { getCompany } = require("../controlers/company");
const {
  addPayment,
  getPayment,
  ClientPayment,
  deletePayment,
  undeletePayment,
  getDepositCashPayment,
  
  dailyReport,
  getCashPayment,
  getUserPayment,
  getDeletedPayment,
  getDeposit,
  addDeposit,
  idPayment,
} = require("../controlers/payments");
const {
  getClients,
  addClient,
  modifyClient,
  deleteClient,
  undeleteClient,
  getDeletedClients,
} = require("../controlers/clients");
const { getLocations, addLocations } = require("../controlers/location");
const { getCategories, addCategories } = require("../controlers/categories");
const {
  addDailyReport,
  getDailyReports,
  resetDailyReport
} = require("../controlers/dailyReport");
const {
  getDealers,
  addDealer,
  paidDealer
} = require("../controlers/Dealer");

const router = Router();

  router.get("/", get);
  router.get("/Quotes", getQuotes);
  router.get("/getDealers", getDealers);
  router.post("/addDealer", addDealer);
  router.post("/paidDealer", paidDealer);
  router.get("/getStatus", getStatus);
  router.get("/getUserPayment", getUserPayment);
  router.get("/clients", getClients);
  router.post("/modifyClient", modifyClient);
  router.post("/modifyProducer", modifyProducer);
  router.get("/users", users);
  router.post("/modifyQuote", modifyQuotes);
  router.post("/addCategories", addCategories);
  router.post("/addQuoteStatus", addQuoteStatus);
  router.get("/getQuoteStatus", getQuoteStatus);
  router.get("/producerQuotes", producerQuotes);
  router.get("/locationQuotes", locationQuotes);
  router.get("/clientQuotes", clientQuotes);
  router.get("/companyQuotes", companyQuotes);
  router.get("/dateQuotes", dateQuotes);
  router.get("/getDealerSalePerson", getDealerSalePerson);
  router.get("/idquotes", idQuotes);
  router.get("/getProducer", getProducer);
  router.get("/getProducerFilter", getProducerFilter);
  router.get("/getCompany", getCompany);
  router.get("/getCashPayment", getCashPayment);
  router.get("/dailyReport", dailyReport);
  router.get("/getManager", getManager);
  router.post("/modifyManager", modifyManager);
  router.post("/addDailyReport", addDailyReport);
  router.post("/addManager", addManager);
  router.post("/login", login);
  router.post("/addquote", addQuote);
  router.post("/addcompany", addCompany);
  router.post("/addproducer", addProducer);
  router.post("/Deposit", addDeposit);
  router.post("/addDealerSalePerson", addDealerSalePerson);
  router.post("/addClient", addClient);
  router.post("/addPayment", addPayment);
  router.post("/addClientPayment", ClientPayment);
  router.post("/deleteClient", deleteClient);
  router.get("/getpayments", getPayment),
  router.get("/getDailyReports", getDailyReports),
  router.post("/deleteQuote", deleteQuote),
  router.post("/resetDailyReport", resetDailyReport),
  router.post("/addNotes", addNotes),
  router.post("/undeleteQuote", undeleteQuote),
  router.post("/undeletePayment", undeletePayment),
  router.post("/undeleteClient", undeleteClient),
  router.get("/getDeletedClients", getDeletedClients),
  router.get("/getDeletedPayment", getDeletedPayment),
  router.get("/getDeletedQuotes", getDeletedQuotes),
  router.get("/getProuducerUser", getProuducerUser),
  router.get("/getlocations", getLocations),
  router.post("/addlocation", addLocations),
  router.post("/deletePayment", deletePayment),
  router.get("/getCategories", getCategories),
  router.get("/getOnlyProducer", getOnlyProducer),
  router.post("/deleteManager", deleteManager),
  router.post("/undeleteManager", undeleteManager),
  router.post("/deleteProducer", deleteProducer),
  router.post("/undeleteProducer", undeleteProducer),
  router.get("/getDeletedManager", getDeletedManager),
  router.get("/getDeletedProducer", getDeletedProducer),
  router.get("/getDeposit", getDeposit),
  router.get("/idPayment", idPayment),
  (module.exports = router);

  