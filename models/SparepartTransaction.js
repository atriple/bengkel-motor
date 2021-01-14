const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "SparepartTransaction",
    {
      JumlahSparepart: DataTypes.INTEGER,
    },
    {
      tableName: "TransaksiSparepart",
    }
  );
};
