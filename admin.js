require("dotenv").config();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");
AdminBro.registerAdapter(AdminBroSequelize);

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.LOGIN,
  process.env.PASSWORD,
  {
    dialect: "mssql",
  }
);

// Initiate Models
const Customer = require("./models/Customer")(sequelize);
const Item = require("./models/Item")(sequelize);
const Employee = require("./models/Employee")(sequelize);
const Motorcycle = require("./models/Motorcycle")(sequelize);

Customer.hasMany(Motorcycle);
Motorcycle.belongsTo(Customer);

const express = require("express");
const app = express();

const run = async () => {
  await sequelize.sync({ force: true });
  const adminBro = new AdminBro({
    resources: [Customer, Item, Employee, Motorcycle],
    databases: [],
    rootPath: "/admin",
  });
  const router = AdminBroExpress.buildRouter(adminBro);

  app.use(adminBro.options.rootPath, router);
  app.listen(8080, () => console.log("AdminBro is under localhost:8080/admin"));
};

run();
