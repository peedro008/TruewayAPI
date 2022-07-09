const { Producer,Quote, Payments, Client, Users, Location,Deposit, QuoteStatus, Category, Company } = require("../db");

const { Op } = require("sequelize");
const NSDcalculator = (category, amount=0) => {
 
  if(category==1){
      return amount*40
  }
  else if(category==2){
      return 0
  }
  else if(category==3){
    return amount*25
  }
  else if(category==4){
    return amount*60
  }
  else if(category==5){
    return amount*60
  }
  else if(category==6){
    return amount*60
  }
  else if(category==7){
    return 0
  }
  else if(category==8){
    return amount*40
  }
  else if(category==9){
    return 25
  }
}





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









const getPayment = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location },  { model: Quote }],
      where: { deleted: false },
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
    notes,
    PIPvalue,
    NSDamount,
    MVRvalue,
    CategoryId
  } = req.body;
  let neww = req.body.new;
  let NSDvalue =  NSDcalculator( parseFloat(CategoryId), parseFloat(NSDamount))
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
        NSDamount: NSDamount == "" ? "0" : NSDamount,
        NSDvalue: NSDvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
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
    CategoryId,
    MVRamount,
    notes,
    QuoteId
  } = req.body;
 // let NSDvalue =  NSDcalculator( parseFloat(CategoryId), parseFloat(NSDamount))
  
 // let PIPvalue = NSDcalculator(parseFloat(CategoryId), parseFloat(PIPamount));
 
  //let MVRvalue = NSDcalculator(parseFloat(CategoryId), parseFloat(MVRamount));
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
      
      creditCardFee: creditCardFee == "" ? "0" : creditCardFee,
      PIPvalue: PIPamount == "" ? "0" : PIPamount,
      NSDamount: NSDamount == "" ? "0" : NSDamount,
      MVRvalue: MVRamount == "" ? "0" : MVRamount,
      NSDvalue:NSDamount,
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
  const LocationId = req.query.LocationId;
  try {
    const payments = await Payments.findAll({
      attributes: { exclude: ["modifiedAt"] },
     
      include: [{ model: Client }, { model: Users }, { model: Location }],
      where: { deleted: false, LocationId: LocationId, deposited: false, method:"Cash" },
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
  let ated = date.substring(0, 10);
  let LocationId = req.query.LocationId;
  try {
    let PaymentsDB = await Payments.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Users }, { model: Location }],
      where: {
        date: ated,
        LocationId: LocationId,
        DailyReportId: null,
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
  getPaymentsReport
};
