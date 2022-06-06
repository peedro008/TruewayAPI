const { DataTypes, NOW } = require("sequelize");

const Dealer = (sequelize) => {
  sequelize.define("Dealer", {
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DealerSalePersonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateSold: {
      type: DataTypes.DATEONLY,

      defaultValue: NOW,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: NOW,
    },
    datePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: NOW,
    },
  });
};
module.exports = Dealer;
