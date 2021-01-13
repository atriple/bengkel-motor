const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Item",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
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
