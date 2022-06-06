const { DataTypes } = require("sequelize");

const DealerSalePerson = (sequelize) => {
  sequelize.define("DealerSalePerson", {
    name: {
      type: DataTypes.TEXT,
    },
    CompanyId: {
      type: DataTypes.INTEGER,
    },
  });
};
module.exports = DealerSalePerson;
