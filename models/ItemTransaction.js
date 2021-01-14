const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ItemTransaction",
    {
      JumlahPembelian: DataTypes.INTEGER,
    },
    {
      tableName: "TransaksiItem",
    }
  );
};
