
require('dotenv').config();
const { compare } = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize('postgres://postgres:pesanmene@localhost:5432/trueway', {logging: false,});

const sequelize = new Sequelize( "postgres", "postgres", "pesanmene",  {
  host: "aacao4lyn1y73d.cviwhti8ghss.us-east-1.rds.amazonaws.com",
  dialect:'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
 // Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Client,Company,Producer,Quote,  Users, Payments, Location, Category, QuoteStatus, Dealer } = sequelize.models;



Category.hasMany(Company, {
  foreignKey: 'CategoryId'
});
Company.belongsTo(Category)

Category.hasMany(Quote, {
  foreignKey: 'CategoryId'
});
Quote.belongsTo(Category)

Location.hasMany(Quote, {
  foreignKey: 'LocationId'
});
Quote.belongsTo(Location)

Location.hasMany(Producer, {
  foreignKey: 'LocationId'
});
Producer.belongsTo(Location)

Location.hasMany(Payments, {
  foreignKey: 'LocationId'
});
Payments.belongsTo(Location)

Client.hasMany(Payments,{
  foreignKey: "ClientId"});
Payments.belongsTo(Client);

Users.hasMany(Payments, {
  foreignKey: 'UserId'
});
Payments.belongsTo(Users);

Users.hasMany(Quote, {
  foreignKey: 'UserId'
});
Quote.belongsTo(Users);

Client.hasMany(Payments, {
  foreignKey: 'ClientId'
});
Payments.belongsTo(Client)

Client.hasMany(Quote, {
  foreignKey: 'ClientId'
});
Quote.belongsTo(Client)

Company.hasMany(Quote, {
  foreignKey: 'CompanyId'
});
Quote.belongsTo(Company);

Quote.hasMany(Payments, {
  foreignKey: 'QuoteId'
});
Payments.belongsTo(Company);

Quote.hasMany(QuoteStatus);
QuoteStatus.belongsTo(Quote);

Users.hasMany(QuoteStatus, {
  foreignKey: 'UserId'
});
QuoteStatus.belongsTo(Users);

Dealer.hasMany(Quote, {
  foreignKey: 'DealerId'
});
Quote.belongsTo(Dealer);

Users.hasOne(Producer, {
  foreignKey: 'UserId'
});
Producer.belongsTo(Users)






module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   sequelize,    // para importart la conexión { conn } = require('./db.js');
};