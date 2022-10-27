const { Producer,Quote, Payments, Client, Users, Location,Deposit, QuoteStatus, Category, Company } = require("../db");

const { Op } = require("sequelize");






const getPaymentsReport = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;
  let offset = req.query.offset;
  delete objQ.dateFrom;
  delete objQ.dateTo;
  delete objQ.offset;

  if (dateFrom !== null && dateFrom !== undefined) {
    objQ = { ...objQ, date: { [Op.between]: [dateFrom, dateTo] } };
  }

  objQ = { ...objQ, deleted: false };

  try {
    let PaymentsDB = await Payments.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location },  { model: Quote }],
      include: [
        { model: Client },
        { model: Users },
        {
          model: Quote,
         include: [QuoteStatus],
        },
       
        { model: Location },
        
      ],
      order: [
        ['id', 'DESC'],
      ],
      where: objQ,
      limit: 20,
      offset: offset,
    });

    PaymentsDB.length
      ? res.status(200).json(PaymentsDB)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in Payments controller" + e);
  }
};



const getPaymentsStats = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;

  delete objQ.dateFrom;
  delete objQ.dateTo;


  if (dateFrom !== null && dateFrom !== undefined) {
    objQ = { ...objQ, date: { [Op.between]: [dateFrom, dateTo] } };
  }

  objQ = { ...objQ, deleted: false };

  try {
    let PaymentsDB = await Payments.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location },  { model: Quote }],
      include: [
        { model: Client },
        { model: Users },
        { model: Category },
        {
          model: Quote,
         include: [QuoteStatus],
        },
       
        { model: Location },
        
      ],
      order: [
        ['id', 'DESC'],
      ],
      where: objQ,

    });

    PaymentsDB.length
      ? res.status(200).json(PaymentsDB)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in Payments controller" + e);
  }
};




const date = new Date();
const DATE1 =
date.getFullYear() + ( (date.getMonth() + 1)>9?"-":"-0" )+ (date.getMonth() + 1)+"-01"
const DATE2 =
date.getFullYear() + ( (date.getMonth() +2)>9?"-":"-0" )+ (date.getMonth()+2)+"-01"
const getPayment = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location },  { model: Quote },  { model: Category}],
      where: { deleted: false, date: { [Op.between]: [DATE1, DATE2] } },
    });
    payments.length
      ? res.status(200).json(payments)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};



const ClientPayment = (req, res) => {
  let {
    LocationId,
    amount,
    method,
    type,
    creditCardFee,
    UserId,
    name,
    email,
    phone,
    CategoryNsd,
    notes,

    CategoryId
  } = req.body;
  let neww = req.body.new;
  let PIPamount = req.body.PIPamount;
  let PIPvalue =  PIPamount?10*parseFloat(PIPamount):0
  let NSDamount = req.body.NSDamount;
  let NSDvalue =  CategoryNsd*NSDamount
  let MVRamount = req.body.MVRamount;
  let MVRvalue = MVRamount?9*parseFloat(MVRamount):0
  console.log(NSDamount, NSDvalue)
  try {
    const client = Client.create({
      name: name,
      email: email,
      tel: phone,
      new: neww,
      notes: notes,
    })
    .then((Client) => {
      const pay = Payments.create({
        ClientId: Client.id,
        LocationId: LocationId,
        amount: amount,
        method: method,
        DepositId: null,
        type: type,
        CategoryId:CategoryId,
        UserId: UserId,
        QuoteId:null,
        creditCardFee: creditCardFee && creditCardFee,
        PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
        NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
      });
    });
    client
      ? res.status(200).json(client)
      : res.status(404).send("Payment error");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};









const addPayment = async (req, res) => {
  let {
    ClientId,
    LocationId,
    amount,
    method,
    type,
    creditCardFee,
    UserId,
    PIPamount,
    NSDamount,
    CategoryNsd,
    CategoryId,
    MVRamount,
    notes,
    QuoteId
  } = req.body;
  let NSDvalue =  CategoryNsd*NSDamount
  
  let PIPvalue =  PIPamount?10*parseFloat(PIPamount):0
 
  let MVRvalue = MVRamount?9*parseFloat(MVRamount):0
  console.log(NSDamount, NSDvalue)
  try {
    let pay = await Payments.create({
      ClientId: ClientId,
      QuoteId: QuoteId,
      LocationId: LocationId,
      amount: amount,
      CategoryId:CategoryId,
      method: method,
      type: type,
      DepositId: null,
      UserId: UserId,
      NSDamount: NSDamount,
      creditCardFee: creditCardFee == "" ? "0" : creditCardFee,
      PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
      MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
      NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
   
    });
    let quoteStatus
  if(QuoteId){
     quoteStatus = await QuoteStatus.create({
      note: notes,
      Status: "Sold",
      QuoteId: QuoteId,
      UserId: UserId,
    });}
    
    res.status(200).json({pay, quoteStatus});
  } catch (e) {
    console.log("Error in addPayment controller " + e);
    res.status(400).send("Error in addPayment controller");
  }
};







const addMultiPayment = async (req, res) => {
  let {
    ClientId,
    LocationId,
    amount,
    method,
    type,
    creditCardFee,
    UserId,
    PIPamount,
    NSDamount,
    CategoryNsd,
    CategoryId,
    MVRamount,
    notes,
    QuoteId,
    method2,
    percent
  } = req.body;
  let NSDvalue =  (CategoryNsd*NSDamount)*percent
  let NSDvalue2 =  (CategoryNsd*NSDamount)*(1-percent)
  
  let PIPvalue =  PIPamount?(10*parseFloat(PIPamount))*percent:0
  let PIPvalue2 =  PIPamount?(10*parseFloat(PIPamount))*(1-percent):0
 
  let MVRvalue = MVRamount?(9*parseFloat(MVRamount))*percent:0
  let MVRvalue2 = MVRamount?(9*parseFloat(MVRamount))*(1-percent):0

  let amount1 = amount*percent
  let amount2 = amount*(1-percent)

  let creditCardFee1 = creditCardFee*percent
  let creditCardFee2 = creditCardFee*(1-percent)

  try {
    let pay1 = await Payments.create({
      ClientId: ClientId,
      QuoteId: QuoteId,
      LocationId: LocationId,
      amount: amount1,
      CategoryId:CategoryId,
      method: method,
      type: type,
      DepositId: null,
      UserId: UserId,
      NSDamount: NSDamount,
      creditCardFee: creditCardFee1 == "" ? "0" : creditCardFee1,
      PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
      MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
      NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
   
    });
    let pay2 = await Payments.create({
      ClientId: ClientId,
      QuoteId: QuoteId,
      LocationId: LocationId,
      amount: amount2,
      CategoryId:CategoryId,
      method: method2,
      type: type,
      DepositId: null,
      UserId: UserId,
      NSDamount: NSDamount,
      creditCardFee: creditCardFee2 == "" ? "0" : creditCardFee2,
      PIPvalue: PIPvalue2 == "" ? "0" : PIPvalue2,
      MVRvalue: MVRvalue2 == "" ? "0" : MVRvalue2,
      NSDvalue: NSDvalue2 == "" ? "0" : NSDvalue2,
   
    });


    let quoteStatus
  if(QuoteId){
     quoteStatus = await QuoteStatus.create({
      note: notes,
      Status: "Sold",
      QuoteId: QuoteId,
      UserId: UserId,
    });}
    
    res.status(200).json({pay1,pay2, quoteStatus});
  } catch (e) {
    console.log("Error in addPayment controller " + e);
    res.status(400).send("Error in addPayment controller");
  }
};






const ClientMultiPayment = async (req, res) => {
  let {
    LocationId,
    amount,
    method,
    type,
    creditCardFee,
    QuoteId,
    UserId,
    name,
    email,
    phone,
    CategoryNsd,
    notes,
    PIPamount,
    CategoryId,
    NSDamount,
    MVRamount,
    method2,
    percent
  } = req.body;
  let neww = req.body.new;
  let NSDvalue =  (CategoryNsd*NSDamount)*percent
  let NSDvalue2 =  (CategoryNsd*NSDamount)*(1-percent)
  
  let PIPvalue =  PIPamount?(10*parseFloat(PIPamount))*percent:0
  let PIPvalue2 =  PIPamount?(10*parseFloat(PIPamount))*(1-percent):0
 
  let MVRvalue = MVRamount?(9*parseFloat(MVRamount))*percent:0
  let MVRvalue2 = MVRamount?(9*parseFloat(MVRamount))*(1-percent):0

  let amount1 = amount*percent
  let amount2 = amount*(1-percent)

  let creditCardFee1 = creditCardFee*percent
  let creditCardFee2 = creditCardFee*(1-percent)
  try {
    const client = await Client.create({
      name: name,
      email: email,
      tel: phone,
      new: neww,
      notes: notes,
    })
   
      const pay1 = await Payments.create({
        ClientId: client.id,
        LocationId: LocationId,
        amount: amount1,
        method: method,
        DepositId: null,
        type: type,
        CategoryId:CategoryId,
        UserId: UserId,
        QuoteId:null,
        creditCardFee: creditCardFee1 == "" ? "0" :  creditCardFee1,
        PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
        NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
      });
      const pay2 = await Payments.create({
        ClientId: client.id,
        LocationId: LocationId,
        amount: amount2,
        method: method2,
        DepositId: null,
        type: type,
        CategoryId:CategoryId,
        UserId: UserId,
        QuoteId:null,
        creditCardFee: creditCardFee2 == "" ? "0" :  creditCardFee2,
        PIPvalue: PIPvalue2 == "" ? "0" : PIPvalue2,
        MVRvalue: MVRvalue2 == "" ? "0" : MVRvalue2,
        NSDvalue: NSDvalue2 == "" ? "0" : NSDvalue2,
      });

   
        
    client
      ? res.status(200).json(client,pay1,pay2)
      : res.status(404).send("Payment error");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};









const getUserPayment = async (req, res) => {
  let papa = req.query.UserId;
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [
        { model: Client },
        { model: Users, where: { id: papa } },
        { model: Location },
        { model: Category}
       
      ],
      where: { deleted: false },
    });
    payments.length
      ? res.status(200).json(payments)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};








const getDeletedPayment = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location }],
      where: { deleted: true },
    });
    payments.length
      ? res.status(200).json(payments)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};

const getCashPayment = async (req, res) => {
  let date_ob = new Date();
  const DATE = date_ob.getFullYear() + "-0" + (date_ob.getMonth() + 1) + "-" + date_ob.getDate()
  const LocationId = req.query.LocationId;
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
     
      include: [{ model: Client }, { model: Users }, { model: Location }],
      where: { deleted: false, LocationId: LocationId, deposited: false, method:"Cash", date: DATE},
    });
    payments.length
      ? res.status(200).json(payments)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};
const getDepositCashPayment = async (req, res) => {
  const UserId = req.query.UserId;
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
      where: {
        deleted: false,
        deposited: false,
        UserId: UserId,
        method: "Cash",
      },
      include: [{ model: Client }, { model: Users }, { model: Location }],
    });
    payments.length
      ? res.status(200).json(payments)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in payments controller" + e);
  }
};
const dailyReport = async (req, res) => {
  let date = new Date().toJSON();
  let date1 = new Date()
  let ated = date.substring(0, 10);
  let reya = new Date(date1.getTime()-86400000).toJSON();
  let LocationId = req.query.LocationId;
  let yesterday = req.query.yesterday
  try {
    let PaymentsDB = await Payments.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location }],
      where: {
        date: !yesterday?ated:reya,
        LocationId: LocationId,
        DailyReportId: null,
        deleted: false
      },
    });

    PaymentsDB.length
      ? res.status(200).json(PaymentsDB)
      : res.status(404).send("no Payments");
  } catch (e) {
    console.log("Error in GenerateDailyReport controller" + e);
  }
};
const getDeposit = async (req, res) => {
    try {
      let deposit = await Deposit.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [{ model: Payments }, { model: Users }, { model: Location }],
        
      });
      deposit.length
        ? res.status(200).json(deposit)
        : res.status(404).send("no Deposit");
    } catch (e) {
      console.log("Error in getDeposit controller" + e);
    }
  };
const addDeposit = async (req, res) => {
  let id = req.body.id;
  let LocationId = req.body.LocationId
  let UserId = req.body.UserId
  let note = req.body.note
  let total = req.body.total
  try {
    let deposit = await Deposit.create({
        note: note,
        LocationId: LocationId,
        UserId: UserId,
        total:total
    })
    let pay = await Payments.update(
      { deposited: true, DepositId: deposit.id },
      {
        where: {
          LocationId: LocationId,
          id: {
            [Op.in]: id,
          },
        },
      }
    );

    res.status(200).json({deposit, pay});
  } catch (e) {
    console.log("Error in deposit" + e);
  }
};

const deletePayment = async (req, res) => {
  let PaymentId = req.body.PaymentId;
  try {
    const deleted = await Payments.update(
      { deleted: true },
      { where: { id: PaymentId } }
    );
    res.status(200).json(deleted);
  } catch (e) {
    console.log("Error in deletePayment controller" + e);
  }
};
const undeletePayment = async (req, res) => {
  let PaymentId = req.body.PaymentId;
  try {
    const deleted = await Payments.update(
      { deleted: false },
      { where: { id: PaymentId } }
    );
    res.status(200).json(deleted);
  } catch (e) {
    console.log("Error in deletePayment controller" + e);
  }
};
const idPayment = async (req, res) => {
  var ID = req.query.id;

  try {
    let QuotesDB = await Payments.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      where: {
        id: ID,
        deleted: false,
      },
      include: [
        { model: Client },
        { model: Users },
        { model: Quote, include: [QuoteStatus, Company] },
        { model: Location },
        { model: Category },
      ],
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
module.exports = {
  getDeletedPayment,
  undeletePayment,
  addPayment,
  getUserPayment,
  getPayment,
  deletePayment,
  ClientPayment,
  getDepositCashPayment,
  addDeposit,
  getDeposit,
  dailyReport,
  getCashPayment,
  idPayment,
  getPaymentsReport,
  getPaymentsStats,
addMultiPayment,
  ClientMultiPayment,
};
