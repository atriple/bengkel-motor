const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Item",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      NamaBarang: {
        type: DataTypes.STRING,
      },
      HargaBarang: DataTypes.BIGINT,
      JumlahStok: DataTypes.INTEGER,
    },
    {
      tableName: "Barang",
    }
  );
};
