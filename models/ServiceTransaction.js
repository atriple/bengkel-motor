const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ServiceTransaction",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      DeskripsiServis: DataTypes.STRING,
      BiayaServis: DataTypes.BIGINT,
      TanggalSelesai: DataTypes.DATE,
    },
    {
      tableName: "TransaksiServis",
    }
  );
};
