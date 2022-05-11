const { DataTypes } = require("sequelize");

const Producer = (sequelize) => {
  sequelize.define("Producer", {
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
module.exports = Producer;
