const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      NamaPelanggan: {
        type: DataTypes.STRING,
      },
      Alamat: DataTypes.STRING(1000),
      NomorTelepon: DataTypes.STRING(15),
    },
    {
      tableName: "Pelanggan",
    }
  );
};
