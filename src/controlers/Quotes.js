const {
  Quote,
  Client,
  Company,
  Category,
  Location,
  Users,
  QuoteStatus,
  Payments,
  DealerSalePerson,
} = require("../db");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment/moment");

const getQuotesStats = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;

  let status = req.query.Status;
  delete objQ.dateFrom;
  delete objQ.dateTo;
  delete objQ.offset;

  objQ = { ...objQ, deleted: false };
  if (objQ.Status) {
    delete objQ.Status;

    try {
      let QuotesDB = await Quote.findAll({
        attributes: { exclude: ["createdAt", "modifiedAt"] },
        include: [
          {
            model: Client,
            where: {
              deleted: false,
            },
          },
          { model: Company },
          { model: Users },
          {
            model: QuoteStatus,
            order: [[QuoteStatus, "id", "ASC"]],
            where: {
              Status: status,
            },

            include: [Users],
          },
          { model: DealerSalePerson },
          { model: Location },
          { model: Category },
        ],
        order: [["id", "DESC"]],
        where: {
          ...objQ,
          [Op.or]: [
            { date: { [Op.between]: [dateFrom, dateTo] } },
            { closingDate: { [Op.between]: [dateFrom, dateTo] } },
          ],
        },
      });

      QuotesDB.length
        ? res.status(200).json(QuotesDB)
        : res.status(404).send("no Quotes");
    } catch (e) {
      console.log("Error in Quote controller" + e);
    }
  } else {
    try {
      let QuotesDB = await Quote.findAll({
        attributes: { exclude: ["createdAt", "modifiedAt"] },
        include: [
          {
            model: Client,
            where: {
              deleted: false,
            },
          },
          { model: Company },
          { model: Users },
          {
            model: QuoteStatus,
            order: [[QuoteStatus, "id", "ASC"]],

            include: [Users],
          },
          { model: DealerSalePerson },
          { model: Location },
          { model: Category },
        ],
        order: [["id", "DESC"]],
        where: {
          ...objQ,
          [Op.or]: [
            { date: { [Op.between]: [dateFrom, dateTo] } },
            { closingDate: { [Op.between]: [dateFrom, dateTo] } },
          ],
        },
      });

      QuotesDB.length
        ? res.status(200).json(QuotesDB)
        : res.status(404).send("no Quotes");
    } catch (e) {
      console.log("Error in Quote controller" + e);
    }
  }
};

const getQuotesReport = async (req, res) => {
  let objQ = req.query;
  let dateFrom = req.query.dateFrom;
  let dateTo = req.query.dateTo;
  let offset = req.query.offset;
  let status = req.query.Status;
  delete objQ.dateFrom;
  delete objQ.dateTo;
  delete objQ.offset;

  if (dateFrom !== null && dateFrom !== undefined) {
    objQ = { ...objQ, updatedAt: { [Op.between]: [dateFrom, dateTo] } };
  }

  objQ = { ...objQ, deleted: false };
  if (objQ.Status) {
    delete objQ.Status;

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
            where: {
              Status: status,
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
    } catch (e) {
      console.log("Error in Quote controller" + e);
    }
  } else {
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
      ? res.status(200).json(QuotesDB.splice(0, 20))
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
  let date = req.body.date;
  let effectiveDate = req.body.effectiveDate;
  let expirationDate = req.body.expirationDate;
  let policyNumber = req.body.policyNumber;
  let TotalPremium = req.body.TotalPremium;
  let ClientNotes = req.body.notes;
  let PIPamount = req.body.PIPamount;
  let PIPvalue = PIPamount ? 10 * parseFloat(PIPamount) : 0;
  let NSDamount = req.body.NSDamount;
  let NSDvalue = CategoryNsd * NSDamount;
  let MVRamount = req.body.MVRamount;
  let MVRvalue = MVRamount ? 9 * parseFloat(MVRamount) : 0;
  let ClientDb;
  let QuoteDb;
  let QuoteStatusDb;
  let address = req.body.address;

  let New_York_Time = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    timestyle: "full",
    hourCycle: "h24",
  });

  let New_York_Date = new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    timestyle: "full",
    hourCycle: "h24",
  });

  try {
    if (!ClientId) {
      ClientDb = await Client.create({
        name: clientName,
        email: clientEmail,
        tel: Tel,
        new: neww,
        notes: ClientNotes,
        address: address,
        CompanyId: CompanyId,
      })
        .then(
          (Client) =>
            (QuoteDb = Quote.create({
              ClientId: Client.id,
              CompanyId: CompanyId,
              CategoryId: CategoryId,
              UserId: UserId,
              LocationId: LocationId,
              time: New_York_Time,
              down: down,
              DealerSalePerson: DealerSalePersonId,
              monthlyPayment: monthlyPayment,
              totalPremium: TotalPremium,
              PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
              MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
              NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
              date: date,
              SoldBy: bound ? UserId : null,
              closingDate: bound ? New_York_Date : null,
              effectiveDate: effectiveDate || null,
              expirationDate: expirationDate || null,
              policyNumber,
            }))
        )

        .then((Quote) => {
          QuoteStatusDb = QuoteStatus.create({
            note: notes,
            Status: bound ? "Sold" : "Quoted",
            date: New_York_Date,
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
        time: New_York_Time,
        down: down,
        DealerSalePerson: DealerSalePersonId,
        monthlyPayment: monthlyPayment,
        totalPremium: TotalPremium,
        date: date,
        PIPvalue: PIPvalue == "" ? "0" : PIPvalue,
        MVRvalue: MVRvalue == "" ? "0" : MVRvalue,
        NSDvalue: NSDvalue == "" ? "0" : NSDvalue,
        SoldBy: bound ? UserId : null,
        closingDate: bound ? New_York_Date : null,
        effectiveDate: effectiveDate || null,
        expirationDate: expirationDate || null,
        policyNumber,
      }).then((Quote) => {
        QuoteStatus.create({
          note: notes,
          Status: bound ? "Sold" : "Quoted",
          date: New_York_Date,
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
        { model: QuoteStatus },
        { model: Location },
        { model: Category },
      ],
      where: {
        UserId: papa,
        deleted: false,
        SoldBy: null,
      },
    });

    let QuotesDB2 = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Users },
        { model: Client },
        { model: Company },
        { model: QuoteStatus },
        { model: Location },
        { model: Category },
      ],
      where: {
        SoldBy: papa,
        deleted: false,
      },
    });

    if (QuotesDB.length) {
      res.status(200).json([QuotesDB, QuotesDB2]);
    } else if (QuotesDB2.length) {
      res.status(200).json([QuotesDB, QuotesDB2]);
    } else {
      res.status(404).send("no Quotes");
    }
  } catch (e) {
    console.log("Error in Quote controller" + e);
  }
};

const producerQuotesThisMonth = async (req, res) => {
  const date = new Date();
  function sumarDias(fecha, dias) {
    const date = new Date(fecha);
    date.setDate(date.getDate() + dias);
    return date;
  }
  let yearBy = date.getFullYear();
  let monthBy = (date.getMonth() + 1 > 9 ? "-" : "-0") + (date.getMonth() + 1);
  let yearTo = date.getFullYear();
  let monthTo = (date.getMonth() + 2 > 9 ? "-" : "-0") + (date.getMonth() + 2);

  if (monthTo === "-13") (monthTo = "-01"), (yearTo = date.getFullYear() + 1);

  const DATE1 = yearBy + monthBy + "-01";
  const DATE2 = new Date(yearTo + monthTo + "-01");

  let papa = req.query.UserId;

  try {
    let QuotesDB = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Users },
        { model: Client },
        { model: Company },
        { model: QuoteStatus },
        { model: Location },
        { model: Category },
      ],
      where: {
        date: { [Op.between]: [DATE1, sumarDias(DATE2, -1)] },
        UserId: papa,
        deleted: false,
        SoldBy: null,
      },
    });

    let QuotesDB2 = await Quote.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      include: [
        { model: Users },
        { model: Client },
        { model: Company },
        { model: QuoteStatus },
        { model: Location },
        { model: Category },
      ],
      where: {
        closingDate: { [Op.between]: [DATE1, sumarDias(DATE2, -1)] },
        SoldBy: papa,
        deleted: false,
      },
    });

    if (QuotesDB.length) {
      res.status(200).json([QuotesDB, QuotesDB2]);
    } else if (QuotesDB2.length) {
      res.status(200).json([QuotesDB, QuotesDB2]);
    } else {
      res.status(404).send("no Quotes");
    }
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
      ? res.status(200).json(quoteStatus.splice(0, 20))
      : res.status(404).send("no QuoteStatus");
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};
const getUserStatus = async (req, res) => {
  let id = req.query.UserId;
  try {
    let quoteStatus = await QuoteStatus.findAll({
      attributes: { exclude: ["modifiedAt"] },
      include: [
        { model: Quote, include: [{ model: Client }] },
        { model: Users },
      ],
      order: [["id", "DESC"]],
      where: {
        UserId: id,
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
    let result;
    let quotes;
    if (!dateFrom) {
      quotes = await Quote.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          { model: QuoteStatus, order: [["id", "DESC"]] },
          {
            model: Users,
            where: { UserRole: { [sequelize.Op.not]: "Admin" } },
          },
        ],
        order: [["id", "DESC"]],
        where: {
          deleted: false,
        },
      });
    } else {
      quotes = await Quote.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [{ model: QuoteStatus }],
        order: [["id", "DESC"]],
        where: {
          deleted: false,

          [Op.or]: [
            { date: { [Op.between]: [dateFrom, dateTo] } },
            { closingDate: { [Op.between]: [dateFrom, dateTo] } },
          ],
        },
      });
    }
    let Userx = await Users.findAll({
      attributes: { exclude: ["modifiedAt"] },

      order: [["id", "DESC"]],
    });

    let temp = Userx.map((e) => {
      return { id: e.id, name: e.name, sold: 0, unsold: 0, deleted: e.deleted };
    });

    quotes.map((e) => {
      if (!e.SoldBy) {
        temp[temp.findIndex((h) => h.id == e.UserId)].unsold++;
      } else {
        temp[temp.findIndex((h) => h.id == e.SoldBy)].sold++;
      }
    });

    result = temp.map((e) => {
      return {
        ...e,
        avg:
          e.sold + e.unsold
            ? ((100 * e.sold) / (e.sold + e.unsold)).toFixed(0)
            : 0,
      };
    });

    result.length
      ? res.status(200).json(result)
      : res.status(404).json({ message: "ERROR" });
  } catch (e) {
    console.log("Error in QuoteStatus controller" + e);
  }
};
//if (
//   temp[
//     temp
//       .map((object) => object.id)
//       .indexOf(
//         e.QuoteStatuses.sort(function (a, b) {
//           return b.id - a.id;
//         })[0].UserId
//       )
//   ]&&
//   temp[
//     temp
//       .map((object) => object.id)
//       .indexOf(
//         e.QuoteStatuses.sort(function (a, b) {
//           return b.id - a.id;
//         })[0].SoldBy
//       )
//   ]
// ) {
//   e.SoldBy
//     ? (temp[temp.map((object) => object.id).indexOf(e.SoldBy)].sold =
//         temp[temp.map((object) => object.id).indexOf(e.SoldBy)].sold + 1)
//     : (temp[temp.map((object) => object.id).indexOf(e.UserId)].unsold =
//         temp[temp.map((object) => object.id).indexOf(e.UserId)].unsold +
//         1);
// }
const getComission = (payments, quotes) => {
  let pes = 0;

  if (quotes.length) {
    quotes.map((e) => {
      if (
        e.CategoryId == 2 &&
        !e.Payment &&
        e.QuoteStatuses.sort(function (a, b) {
          return b.id - a.id;
        })[0].Status == "Sold"
      ) {
        pes += 10;
      }
    });
  }
  if (payments.length) {
    payments.map((e) => {
      if (e.CategoryId !== 7) {
        if (e.CategoryId == 2) {
          pes += 10;
        }

        pes +=
          5 *
          (e.NSDvalue.length
            ? parseFloat(e.NSDvalue) / parseFloat(e.Category.NSDvalue)
            : 0);
      }
    });
  }
  return pes;
};

const getUserAverage = async (req, res) => {
  try {
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    let UserId = req.query.UserId;
    let result;
    let quotes;
    let payments;
    if (!dateFrom) {
      quotes = await Quote.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          {
            model: QuoteStatus,
            order: [["id", "DESC"]],
            where: {
              UserId: UserId,
              updatedAt: { [Op.between]: [dateFrom, dateTo] },
            },
          },
          {
            model: Users,
            where: {
              UserRole: { [sequelize.Op.not]: "Admin" },
              deleted: false,
            },
          },
        ],
        order: [["id", "DESC"]],
        where: {
          deleted: false,
        },
      });
      payments = await Payments.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          { model: Client },
          { model: Users, where: { id: UserId } },
          { model: Location },
          { model: Category },
        ],
        where: {
          deleted: false,
          NSDvalue: { [sequelize.Op.not]: "0" },
          UserId: UserId,
        },
      });
    } else {
      quotes = await Quote.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          {
            model: QuoteStatus,
            order: [["id", "DESC"]],
            where: {
              updatedAt: { [Op.between]: [dateFrom, dateTo] },
              UserId: UserId,
            },
          },
          {
            model: Users,
            where: {
              UserRole: { [sequelize.Op.not]: "Admin" },
              deleted: false,
            },
          },
        ],
        order: [["id", "DESC"]],
        where: {
          deleted: false,
        },
      });
      payments = await Payments.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          { model: Client },
          { model: Users },
          { model: Location },
          { model: Category },
        ],

        where: {
          UserId: UserId,
          NSDvalue: { [sequelize.Op.not]: "0" },
          deleted: false,
          date: { [Op.between]: [dateFrom, dateTo] },
        },
      });
    }

    let temp = { id: UserId, name: payments[0].User.name, NSDcomm: 0 };

    temp.NSDcomm = getComission(payments, quotes);

    // result = {...temp, avg: temp.sold+temp.unsold?
    //   (100*temp.sold/(temp.sold+e.unsold)).toFixed(0):0}

    temp
      ? res.status(200).json(temp)
      : res.status(404).json({ message: "ERROR" });
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
  let CompanyId = req.body.CompanyId;
  let date = req.body.date;
  let effectiveDate = req.body.effectiveDate;
  let expirationDate = req.body.expirationDate;
  let policyNumber = req.body.policyNumber;
  try {
    if (Status == "Cancelled") {
      let quoteStatus = await QuoteStatus.create({
        note: notes,
        Status: Status,
        QuoteId: QuoteId,
        date: date,
        UserId: UserId,
      });
      res.status(200).json(quoteStatus);
    } else {
      let quoteRef = await Quote.findAll({
        where: { id: QuoteId },
        order: [["id", "DESC"]],
        raw: true,
        nest: true,
      });
      let quote = await Quote.update(
        {
          down: down,
          policyNumber,
          expirationDate,
          effectiveDate,
          monthlyPayment: monthly,
          CompanyId: CompanyId,
          closingDate: quoteRef.closingDate
            ? quoteRef.closingDate
            : new Date().toISOString().split("T")[0],
          SoldBy: quoteRef.SoldBy ? quoteRef.SoldBy : UserId,
        },
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
        date: date,
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
  getUsersAverage,
  getUserAverage,
  producerQuotesThisMonth,
};
