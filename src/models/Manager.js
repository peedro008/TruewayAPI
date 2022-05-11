const { DataTypes } = require("sequelize");

const Manager = (sequelize) => {
  sequelize.define("Manager", {
    UserId: {
      type: DataTypes.INTEGER,
    },
    LocationId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT(),
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
module.exports = Manager;
