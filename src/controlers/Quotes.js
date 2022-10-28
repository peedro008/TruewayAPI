const {
  Quote,
  Client,
  Company,
  Category,
  Location,
  Users,
  QuoteStatus,
  DealerSalePerson,
} = require("../db");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("sequelize");







const getQuotesStats = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;

  let status = req.query.Status
  delete objQ.dateFrom;
  delete objQ.dateTo;
  delete objQ.offset;

  if (dateFrom !== null && dateFrom !== undefined) {
    objQ = { ...objQ, updatedAt: { [Op.between]: [dateFrom, dateTo] } };
  }

  objQ = { ...objQ, deleted: false };
  if(objQ.Status){
    delete objQ.Status
  
    try {
      let QuotesDB = await Quote.findAll({
        attributes: { exclude: ["createdAt", "modifiedAt"] },
        include: [
          { model: Client },
          { model: Company },
          { model: Users },
          {
            model: QuoteStatus,
            order: [
              ["date", "ASC"],
              [QuoteStatus, "id", "ASC"],
            ],
            where:{
              Status:status
            },
  
            include: [Users],
          },
          { model: DealerSalePerson },
          { model: Location },
          { model: Category },
        ],
        order: [["id", "DESC"]],
        where: objQ,
      
     
      });
  
      QuotesDB.length
        ? res.status(200).json(QuotesDB)
        : res.status(404).send("no Quotes");
    }
    catch (e) {
      console.log("Error in Quote controller" + e);
    }
  }
  else{
  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Client },
        { model: Company },
        { model: Users },
        {
          model: QuoteStatus,
          order: [
            ["date", "ASC"],
            [QuoteStatus, "id", "ASC"],
          ],

          include: [Users],
        },
        { model: DealerSalePerson },
        { model: Location },
        { model: Category },
      ],
      order: [["id", "DESC"]],
      where: objQ,

    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
};
















const getQuotesReport = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;
  let offset = req.query.offset;
  let status = req.query.Status
  delete objQ.dateFrom;
  delete objQ.dateTo;
  delete objQ.offset;

  if (dateFrom !== null && dateFrom !== undefined) {
    objQ = { ...objQ, updatedAt: { [Op.between]: [dateFrom, dateTo] } };
  }

  objQ = { ...objQ, deleted: false };
  if(objQ.Status){
    delete objQ.Status
  
    try {
      let QuotesDB = await Quote.findAll({
        attributes: { exclude: ["createdAt", "modifiedAt"] },
        include: [
          { model: Client },
          { model: Company },
          { model: Users },
          {
            model: QuoteStatus,
            order: [
              ["date", "ASC"],
              [QuoteStatus, "id", "ASC"],
            ],
            where:{
              Status:status
            },
  
            include: [Users],
          },
          { model: DealerSalePerson },
          { model: Location },
          { model: Category },
        ],
        order: [["id", "DESC"]],
        where: objQ,
      
        limit: 20,
        offset: offset,
      });
  
      QuotesDB.length
        ? res.status(200).json(QuotesDB)
        : res.status(404).send("no Quotes");
    }
    catch (e) {
      console.log("Error in Quote controller" + e);
    }
  }
  else{
  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Client },
        { model: Company },
        { model: Users },
        {
          model: QuoteStatus,
          order: [
            ["date", "ASC"],
            [QuoteStatus, "id", "ASC"],
          ],

          include: [Users],
        },
        { model: DealerSalePerson },
        { model: Location },
        { model: Category },
      ],
      order: [["id", "DESC"]],
      where: objQ,
      limit: 20,
      offset: offset,
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
};
const getQuotes = async (req, res) => {
  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Client },
        { model: Company },
        { model: Users },
        {
          model: QuoteStatus,
          order: [
            ["date", "ASC"],
            [QuoteStatus, "id", "ASC"],
          ],

          include: [Users],
        },
        { model: DealerSalePerson },
        { model: Location },
        { model: Category },
      ],
      order: [
        ["date", "ASC"],
        [QuoteStatus, "id", "ASC"],
      ],
      where: {
        deleted: false,
      },
    });
    QuotesDB.length
      ? res.status(200).json(QuotesDB.splice(0,20))
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }}

const getDeletedQuotes = async (req, res) => {
  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Client },
        { model: Company },
        { model: Users },
        {
          model: QuoteStatus,
          order: [
            ["date", "ASC"],
            [QuoteStatus, "id", "ASC"],
          ],

          include: [Users],
        },
        { model: Dealer },
        { model: Location },
        { model: Category },
      ],
      order: [
        ["date", "ASC"],
        [QuoteStatus, "id", "ASC"],
      ],
      where: {
        deleted: true,
      },
    });
    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const addQuote = async (req, res) => {
  let DealerSalePersonId = req.body.DealerSalePersonId;
  let LocationId = req.body.LocationId;
  let CategoryId = req.body.CategoryId;
  let notes = req.body.notes;
  let ClientId = req.body.ClientId;
  let clientName = req.body.name;
  let clientEmail = req.body.email;
  let Tel = req.body.tel;
  let CompanyId = req.body.CompanyId;
  let UserId = req.body.UserId;
  let down = req.body.down;
  let CategoryNsd = req.body.CategoryNsd;
  let bound = req.body.Bound;
  let monthlyPayment = req.body.monthlyPayment;
  let neww = req.body.new;
  let date = req.body.date
  let TotalPremium = req.body.TotalPremium;
  let ClientNotes = req.body.notes;
  let PIPamount = req.body.PIPamount;
  let PIPvalue = PIPamount ? 10 * parseFloat(PIPamount) : 0;
  let NSDamount = req.body.NSDamount;
  let NSDvalue = CategoryNsd*NSDamount
  let MVRamount = req.body.MVRamount;
  let MVRvalue = MVRamount ? 9 * parseFloat(MVRamount) : 0;
  let ClientDb;
  let QuoteDb;
  let QuoteStatusDb;
  let address = req.body.address

  try {
    if (!ClientId) {
      ClientDb = await Client.create({
        name: clientName,
        email: clientEmail,
        tel: Tel,
        new: neww,
        notes: ClientNotes,
        address:address,
        CompanyId:CompanyId
      })
        .then(
          (Client) =>
            (QuoteDb = Quote.create({
              ClientId: Client.id,
              CompanyId: CompanyId,
              CategoryId: CategoryId,
              UserId: UserId,
              LocationId: LocationId,
              down: down,
              DealerSalePerson: DealerSalePersonId,
              monthlyPayment: monthlyPayment,
              totalPremium: TotalPremium,
              PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
              MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
              NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
              date:date
             
            }))
        )

        .then((Quote) => {
          QuoteStatusDb = QuoteStatus.create({
            note: notes,
            Status: bound ? "Sold" : "Quoted",
            QuoteId: Quote.id,
            UserId: UserId,
          });
          res.status(200).json(Quote);
        });
    } else {
      Quote.create({
        ClientId: ClientId,
        CompanyId: CompanyId,
        CategoryId: CategoryId,
        UserId: UserId,
        LocationId: LocationId,
        down: down,
        DealerSalePerson: DealerSalePersonId,
        monthlyPayment: monthlyPayment,
        totalPremium: TotalPremium,
        date:date,
        PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
        NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
      }).then((Quote) => {
        QuoteStatus.create({
          note: notes,
          Status: bound ? "Sold" : "Quoted",
          QuoteId: Quote.id,
          UserId: UserId,
        });
      });

      res.status(200).send("Quote Added");
    }
  } catch (e) {
    console.log("Error in addQuote controller " + e);
    res.status(400).send("Error in addQuote controller ");
  }
};

const locationQuotes = async (req, res) => {
  let papa = req.query.location;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Company }, { model: Users }],

      where: { location: papa, deleted: true },
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Cancelations");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const addQuoteStatus = async (req, res) => {
  let notes = req.body.note;
  let Status = req.body.Status;
  let QuoteId = req.body.QuoteId;
  try {
    let quoteStatus = await QuoteStatus.create({
      note: notes,
      Status: Status,
      QuoteId: QuoteId,
    });
    res.status(200).json(quoteStatus);
  } catch (e) {
    console.log("Error in Quote quoteStatus" + e);
  }
};
const producerQuotes = async (req, res) => {
  let papa = req.query.UserId;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Users },
        { model: Client },
        { model: Company },

        { model: QuoteStatus ,where: { UserId: papa }},

        { model: Location },
        { model: Category },
      ],

      where: {
        deleted: false,
      },
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const companyQuotes = async (req, res) => {
  let papa = req.query.company;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Client },
        { model: Company, where: { name: papa } },
        { model: Users },
      ],

      where: {
        deleted: false,
      },
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const clientQuotes = async (req, res) => {
  let papa = req.query.client;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        {
          model: Client,
          where: {
            id: papa,
          },
        },
        { model: Company },
        { model: Users },
        { model: Category },
      ],

      where: {
        deleted: false,
      },
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Cancelations");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const dateQuotes = async (req, res) => {
  let papa = req.query.date;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [{ model: Client }, { model: Company }, { model: Users }],
      where: {
        date: papa,
        deleted: false,
      },
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Cancelations");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};

const getQuoteStatus = async (req, res) => {
  let QuoteId = req.query.QuoteId;

  try {
    let QuoteStatus = await QuoteStatus.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [{ model: Quote }, { model: Company }],
      where: {
        QuoteId: QuoteId,
      },
    });

    QuoteStatus.length
      ? res.status(200).json(QuoteStatus)
      : res.status(404).send("no QuoteStatus");
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};
const getStatus = async (req, res) => {
  try {
    let quoteStatus = await QuoteStatus.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [
        { model: Quote, include: [{ model: Client }] },
        { model: Users },
      ],
      order: [["id", "DESC"]],
      where: {
        deleted: false,
      },
    });

    quoteStatus.length
      ? res.status(200).json(quoteStatus.splice(0,20))
      : res.status(404).send("no QuoteStatus");
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};
const getUserStatus = async (req, res) => {
  let id = req.query.UserId
  try {
    let quoteStatus = await QuoteStatus.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [
        { model: Quote, include: [{ model: Client }] },
        { model: Users },
      ],
      order: [["id", "DESC"]],
      where: {
        UserId:id,
        deleted: false,
      },
    });

    quoteStatus.length
      ? res.status(200).json(quoteStatus)
      : res.status(404).send("no QuoteStatus");
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};


const getUsersAverage = async (req, res) => {
   

  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    let result 
    let quotes
    if(!dateFrom){
    quotes = await Quote.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [
        { model: QuoteStatus, order: [["id", "DESC"]] },
        { model: Users, where:{UserRole:{  [sequelize.Op.not]: 'Admin'},deleted: false,} },
      ],
      order: [["id", "DESC"]],
      where: {
          deleted: false,
      },
    });}
    else{
      quotes = await Quote.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          { model: QuoteStatus , order: [["id", "DESC"]]},
          { model: Users, where:{UserRole:{  [sequelize.Op.not]: 'Admin'},deleted: false,} },
        ],
        order: [["id", "DESC"]],
        where: {
            deleted: false,
            updatedAt: { [Op.between]: [dateFrom, dateTo] }
        },
      });
    }
    let Userx = await Users.findAll({
      attributes: { exclude: ["modifiedAt"] },
    
      order: [["id", "DESC"]],
      where:{UserRole:{  [sequelize.Op.not]: 'Admin'}} 
    });

    let temp =Userx.map(e=>{
      return {id:e.id,
        name:e.name,
              sold:0,
              unsold:0}
    })

    quotes.map(e=>{
      if(temp[temp.map(object => object.id).indexOf(e.QuoteStatuses[0].UserId)]){
      e.QuoteStatuses[0].Status==="Sold"?
      temp[temp.map(object => object.id).indexOf(e.QuoteStatuses[0].UserId)].sold= temp[temp.map(object => object.id).indexOf(e.QuoteStatuses[0].UserId)].sold+1
      :
      temp[temp.map(object => object.id).indexOf(e.QuoteStatuses[0].UserId)].unsold= temp[temp.map(object => object.id).indexOf(e.QuoteStatuses[0].UserId)].unsold+1
    }})

    result = temp.map(e=>{      return{...e, avg: e.sold+e.unsold?
      (100*e.sold/(e.sold+e.unsold)).toFixed(0):0}

    })






    result.length
      ? res.status(200).json(result)
      : res.status(404).json({message:"ERROR"});


    
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};






























const idQuotes = async (req, res) => {
  var ID = req.query.id;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      where: {
        id: ID,
        deleted: false,
      },
      include: [
        { model: Client },
        { model: Company },
        { model: Users },
        { model: QuoteStatus, include: [Users] },
        { model: Location },
      ],
    });

    QuotesDB.length
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
const modifyQuotes = async (req, res) => {
  let notes = req.body.note;
  let Status = req.body.Status;
  let QuoteId = req.body.QuoteId;
  let monthly = req.body.monthly;
  let down = req.body.down;
  let UserId = req.body.UserId;
  let CompanyId = req.body.CompanyId
  let date = req.body.date
  try {
    if (Status == "Cancelled") {
      let quoteStatus = await QuoteStatus.create({
        note: notes,
        Status: Status,
        QuoteId: QuoteId,
        date:date,
        UserId: UserId,
      });
      res.status(200).json(quoteStatus);
    } else {
      let quote = await Quote.update(
        { down: down, monthlyPayment: monthly,CompanyId:CompanyId },
        {
          where: {
            id: QuoteId,
          },
        }
      );
      let quoteStatus = await QuoteStatus.create({
        note: notes,
        Status: Status,
        QuoteId: QuoteId,
        UserId: UserId,
        date:date
      });
      res.status(200).json(quote);
    }
  } catch (e) {
    console.log("Error in Quote quoteStatus" + e);
  }
};
const addNotes = async (req, res) => {
  let notes = req.body.note;
  let QuoteId = req.body.QuoteId;
  let UserId = req.body.UserId;

  try {
    let quoteStatus = await QuoteStatus.create({
      note: notes,
      Status: "-",
      QuoteId: QuoteId,
      UserId: UserId,
    });
    res.status(200).json(quoteStatus);
  } catch (e) {
    console.log("Error in Quote quoteStatus" + e);
  }
};
const deleteQuote = async (req, res) => {
  let QuoteId = req.body.QuoteId;
  try {
    const deleted = await Quote.update(
      { deleted: true },
      { where: { id: QuoteId } }
    );
    const statusDeleted = await QuoteStatus.update(
      { deleted: true },
      { where: { QuoteId: QuoteId } }
    );
    res.status(200).json(deleted, statusDeleted);
  } catch (e) {
    console.log("Error in deleteQuote controller" + e);
  }
};
const undeleteQuote = async (req, res) => {
  let QuoteId = req.body.QuoteId;
  try {
    const deleted = await Quote.update(
      { deleted: false },
      { where: { id: QuoteId } }
    );
    const statusDeleted = await QuoteStatus.update(
      { deleted: false },
      { where: { QuoteId: QuoteId } }
    );
    res.status(200).json(deleted, statusDeleted);
  } catch (e) {
    console.log("Error in deleteQuote controller" + e);
  }
};

module.exports = {
  getQuotes,
  producerQuotes,
  companyQuotes,
  clientQuotes,
  addQuote,
  locationQuotes,
  addQuoteStatus,
  getQuoteStatus,
  dateQuotes,
  idQuotes,
  modifyQuotes,
  getStatus,
  deleteQuote,
  undeleteQuote,
  getDeletedQuotes,
  addNotes,
  getQuotesReport,
  getQuotesStats,
  getUserStatus,
  getUsersAverage
};
