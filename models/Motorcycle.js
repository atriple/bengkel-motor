const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Motorcycle",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      NomorPolisi: {
        type: DataTypes.CHAR(10),
      },
      Merk: DataTypes.STRING,
      TahunPembuatan: DataTypes.INTEGER,
    },
    {
      tableName: "Motor",
    }
  );
};
