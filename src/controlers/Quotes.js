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

const NSDcalculator = (category, amount = 0) => {
  if (category == 1) {
    return amount * 40;
  } else if (category == 2) {
    return 0;
  } else if (category == 3) {
    return amount * 25;
  } else if (category == 4) {
    return amount * 60;
  } else if (category == 5) {
    return amount * 60;
  } else if (category == 6) {
    return amount * 60;
  } else if (category == 7) {
    return 0;
  } else if (category == 8) {
    return amount * 40;
  } else if (category == 9) {
    return 25;
  }
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
      ? res.status(200).json(QuotesDB)
      : res.status(404).send("no Quotes");
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};
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
  let MVRvalue = req.body.MVRvalue;
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

  let bound = req.body.Bound;
  let monthlyPayment = req.body.monthlyPayment;
  let neww = req.body.new;

  let TotalPremium = req.body.TotalPremium;
  let ClientNotes = req.body.notes;
  let PIPvalue = req.body.PIPvalue;
  let NSDamount = req.body.NSDamount;
  let NSDvalue = NSDcalculator(parseFloat(CategoryId), parseFloat(NSDamount));
  let ClientDb;
  let QuoteDb;
  let QuoteStatusDb
  try {
    if (!ClientId) {
      ClientDb = await Client.create({
        name: clientName,
        email: clientEmail,
        tel: Tel,
        new: neww,
        notes: ClientNotes,
      }).then((Client) => 
        QuoteDb=  Quote.create({
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
            NSDvalue: NSDvalue,
            MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
            NSDamount: NSDamount == "" ? "0" : NSDamount,
          })
          
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
        PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
        NSDvalue: NSDvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
        NSDamount: NSDamount == "" ? "0" : NSDamount,
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
        { model: Users, where: { id: papa } },
        { model: Client },
        { model: Company },

        { model: QuoteStatus },
        { model: Dealer },
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

      where: {
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

  try {
    if (Status == "Cancelled") {
      let quoteStatus = await QuoteStatus.create({
        note: notes,
        Status: Status,
        QuoteId: QuoteId,
        UserId: UserId,
      });
      res.status(200).json(quoteStatus);
    } else {
      let quote = await Quote.update(
        { down: down, monthlyPayment: monthly },
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
};
