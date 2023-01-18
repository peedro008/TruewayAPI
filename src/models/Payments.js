const { DataTypes, NOW } = require("sequelize");

const Payments = (sequelize) => {
  sequelize.define("Payments", {
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    QuoteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DepositId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    increasePremium: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: NOW,
      allowNull: false,
    },
    effectiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    policyNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    method: {
      type: DataTypes.ENUM("credit/debit", "EFT", "Cash"),
    },
    type: {
      type: DataTypes.ENUM(
        "Monthly Payment",
        "Down Payment",
        "Endorsement",
        "Renew Down",
        "Full Premium"
      ),
    },
    deposited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creditCardFee: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    NSDvalue: {
      type: DataTypes.STRING,
    },
    NSDamount: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    PIPvalue: {
      type: DataTypes.STRING,
    },

    MVRvalue: {
      type: DataTypes.STRING,
    },
  });
};
module.exports = Payments;
