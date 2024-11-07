const { Sequelize } = require("sequelize");
const { applySetup } = require("./setup");

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: "mysql",
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 60000,
  },
  logging: true,
});

const modelDefiners = [
  require("./models/location.model"),
  require("./models/role.model"),
  require("./models/service.model"),
  require("./models/user.model"),
  require("./models/serviceCategory.model"),
  require("./models/workSchedule.model"),
  require("./models/promotion.model"),
  require("./models/employee.model"),
  require("./models/otp.model"),
  require("./models/booking.model"),
  require("./models/employeeWorkSchedule.model"),
  require("./models/paymentMethod.model"),
  require("./models/passwordResetToken.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applySetup(sequelize);

module.exports = sequelize;
