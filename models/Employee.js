const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Employee",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      NamaPegawai: {
        type: DataTypes.STRING,
      },
      Peran: DataTypes.STRING,
    },
    {
      tableName: "Pegawai",
    }
  );
};
