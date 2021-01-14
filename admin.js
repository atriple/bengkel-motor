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
const PurchaseTransaction = require("./models/PurchaseTransaction")(sequelize);
const ItemTransaction = require("./models/ItemTransaction")(sequelize);
const ServiceTransaction = require("./models/ServiceTransaction")(sequelize);
const SparepartTransaction = require("./models/SparepartTransaction")(
  sequelize
);

//Apply association
Customer.hasMany(Motorcycle);
Motorcycle.belongsTo(Customer);

Employee.hasMany(PurchaseTransaction);
PurchaseTransaction.belongsTo(Employee);
Item.belongsToMany(PurchaseTransaction, { through: ItemTransaction });
PurchaseTransaction.belongsToMany(Item, { through: ItemTransaction });

Employee.hasMany(ServiceTransaction);
ServiceTransaction.belongsTo(Employee);
Motorcycle.hasMany(ServiceTransaction);
ServiceTransaction.belongsTo(Motorcycle);
Item.belongsToMany(ServiceTransaction, { through: SparepartTransaction });
ServiceTransaction.belongsToMany(Item, {
  through: SparepartTransaction,
});
///////////////////////////////

const express = require("express");
const app = express();

//Initiate view
const masterNavigation = require("./view/masterNavigation");
const transaksiNavigation = require("./view/transaksiNavigation");

const run = async () => {
  await sequelize.sync();
  const adminBro = new AdminBro({
    resources: [
      {
        resource: Customer,
        options: {
          navigation: masterNavigation,
          properties: {
            NamaPelanggan: { isTitle: true },
          },
        },
      },
      {
        resource: Item,
        options: {
          navigation: masterNavigation,
          properties: {
            NamaBarang: { isTitle: true },
          },
        },
      },
      {
        resource: Employee,
        options: {
          navigation: masterNavigation,
          properties: {
            NamaPegawai: { isTitle: true },
          },
        },
      },
      { resource: Motorcycle, options: { navigation: masterNavigation } },
      {
        resource: PurchaseTransaction,
        options: { navigation: transaksiNavigation },
      },
      {
        resource: ItemTransaction,
        options: { navigation: transaksiNavigation },
      },
      {
        resource: ServiceTransaction,
        options: { navigation: transaksiNavigation },
      },
      {
        resource: SparepartTransaction,
        options: { navigation: transaksiNavigation },
      },
    ],
    databases: [],
    rootPath: "/",
    branding: {
      companyName: "SiPPBENTOR",
      logo: false,
    },
    dashboard: {
      handler: async () => {
        return { some: "Selamat datang di SiPPBENTOR" };
      },
      component: AdminBro.bundle("./view/custom-dashboard"),
    },
    pages: {
      transaksiPembelian: {
        label: "Transaksi Pembelian",
        handler: async (request, response, context) => {
          return {
            text: "I am fetched from the backend",
          };
        },
        component: AdminBro.bundle("./view/transaksiPembelian"),
      },
    },
  });
  const router = AdminBroExpress.buildRouter(adminBro);

  app.use(adminBro.options.rootPath, router);
  app.listen(8080, () => console.log("AdminBro is under localhost:8080"));
};

run();
