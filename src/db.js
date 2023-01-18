require("dotenv").config();
const { compare } = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( "TEMP", "postgres", "pesanmene",  {
  host: "aacao4lyn1y73d.cviwhti8ghss.us-east-1.rds.amazonaws.com",
  dialect:'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// const sequelize = new Sequelize(
//   "postgres://postgres:Messiyyaco@localhost:5432/test",
//   { logging: false }
// );


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Client,
  Company,
  Producer,
  Quote,
  Users,
  Payments,
  Location,
  Dealer,
  Category,
  QuoteStatus,
  DealerSalePerson,
  Manager,
  DailyReport,
  Deposit,
} = sequelize.models;


Client.hasOne(Dealer, {
  foreignKey: {
    name: "ClientId",
    allowNull: true
  }
})
Dealer.belongsTo(Client)

DealerSalePerson.hasMany(Dealer, {
  foreignKey:{
    name: "DealerSalePersonId",
    allowNull: true
  }
})
Dealer.belongsTo(DealerSalePerson)



Users.hasMany(Deposit, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
});
Deposit.belongsTo(Users);

Deposit.hasMany(Payments, {
  foreignKey: {
    name: "DepositId",
    allowNull: true,
  },
});
Payments.belongsTo(Deposit);

Location.hasMany(Deposit, {
  foreignKey: {
    name: "LocationId",
  },
});
Deposit.belongsTo(Location);

Category.hasMany(Company, {
  foreignKey: "CategoryId",
});
Company.belongsTo(Category);

Category.hasMany(Quote, {
  foreignKey: "CategoryId",
});
Quote.belongsTo(Category);

Category.hasMany(Payments, {
  foreignKey: "CategoryId",
});
Payments.belongsTo(Category);

Location.hasMany(Quote, {
  foreignKey: "LocationId",
});
Quote.belongsTo(Location);

Location.hasMany(Producer, {
  foreignKey: "LocationId",
});
Producer.belongsTo(Location);

DailyReport.hasMany(Payments, {
  foreignKey: {
    name: "DailyReportId",
    allowNull: true,
  },
});
Payments.belongsTo(DailyReport);

Location.hasMany(DailyReport, {
  foreignKey: {
    name: "LocationId",
  },
});
DailyReport.belongsTo(Location);

Location.hasMany(Payments, {
  foreignKey: "LocationId",
});
Payments.belongsTo(Location);

Company.hasMany(Client, {
  foreignKey: "CompanyId",
});
Client.belongsTo(Company);

Client.hasMany(Payments, {
  foreignKey: "ClientId",
});
Payments.belongsTo(Client);

Users.hasMany(Payments, {
  foreignKey: "UserId",
});
Payments.belongsTo(Users);

Users.hasMany(Quote, {
  foreignKey: "UserId",
});
Quote.belongsTo(Users);

Users.hasMany(Quote, {
  foreignKey: "SoldBy",
});
Quote.belongsTo(Users);

Client.hasMany(Payments, {
  foreignKey: "ClientId",
});
Payments.belongsTo(Client);

Client.hasMany(Quote, {
  foreignKey: "ClientId",
});
Quote.belongsTo(Client);

Company.hasMany(Quote, {
  foreignKey: "CompanyId",
});
Quote.belongsTo(Company);

Quote.hasMany(Payments, {
  foreignKey: "QuoteId",
});
Payments.belongsTo(Quote);

Quote.hasMany(QuoteStatus);
QuoteStatus.belongsTo(Quote);

Users.hasMany(QuoteStatus, {
  foreignKey: "UserId",
});
QuoteStatus.belongsTo(Users);

DealerSalePerson.hasMany(Quote, {
  foreignKey: "DealerSalePersonId",
});
Quote.belongsTo(DealerSalePerson);

Users.hasOne(Producer, {
  foreignKey: "UserId",
});
Producer.belongsTo(Users);

Users.hasOne(Manager, {
  foreignKey: "UserId",
});
Manager.belongsTo(Users);

Location.hasMany(Manager, {
  foreignKey: "LocationId",
});
Manager.belongsTo(Location);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  sequelize, // para importart la conexión { conn } = require('./db.js');
};
