const { AppError } = require("../app-error");
const transporter = require("../utils/mail");

module.exports = {
  sendMail: async (mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw AppError.from(error, 500);
    }
  },
};
