require("dotenv").config();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");
AdminBro.registerAdapter(AdminBroSequelize);

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.LOGIN,
  process.env.PASSWORD,
  {
    dialect: "mssql",
  }
);

const Customer = sequelize.define(
  "Customer",
  {
    // Model attributes are defined here
    IDPelanggan: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
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

console.log(Customer === sequelize.models.Customer);

const express = require("express");
const app = express();

const run = async () => {
  await Customer.sync({ force: true });
  const adminBro = new AdminBro({
    resources: [Customer],
    databases: [],
    rootPath: "/admin",
  });
  const router = AdminBroExpress.buildRouter(adminBro);

  app.use(adminBro.options.rootPath, router);
  app.listen(8080, () => console.log("AdminBro is under localhost:8080/admin"));
};

run();
