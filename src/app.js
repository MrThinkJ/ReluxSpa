const express = require("express");
const { responseErr } = require("./app-error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("./routes/user.route");
const locationRoutes = require("./routes/location.route");
const promotionRoutes = require("./routes/promotion.route");
const serviceCategoryRoutes = require("./routes/serviceCategory.route");
const serviceRoutes = require("./routes/service.route");
const workScheduleRoutes = require("./routes/workSchedule.route");
const employeeRoutes = require("./routes/employee.route");
const resetPasswordRoutes = require("./routes/resetPassword.route");
const contactRoutes = require("./routes/contact.route");
const bookingRoutes = require("./routes/booking.route");
app.use("/v1", userRoutes);
app.use("/v1/locations", locationRoutes);
app.use("/v1/promotions", promotionRoutes);
app.use("/v1/service-categories", serviceCategoryRoutes);
app.use("/v1/services", serviceRoutes);
app.use("/v1/work-schedules", workScheduleRoutes);
app.use("/v1/employees", employeeRoutes);
app.use("/v1/password", resetPasswordRoutes);
app.use("/v1/contacts", contactRoutes);
app.use("/v1/bookings", bookingRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  responseErr(err, res);
});

module.exports = app;
