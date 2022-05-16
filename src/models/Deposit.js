const { DataTypes, NOW } = require("sequelize");

const Deposit = (sequelize) => {
  sequelize.define("Deposit", {
    UserId: {
      type: DataTypes.INTEGER,
    },
    LocationId: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: NOW,
    },
    note: {
      type: DataTypes.TEXT,
    },

  });
};
module.exports = Deposit;
