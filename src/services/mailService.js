/**
 * Loads environment variables from a .env file into the Node.js process environment.
 * @function
 */
require("dotenv").config();

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

/**
 * A class for sending emails using Nodemailer and EJS templates.
 */
class EmailSender {
  /**
   * Constructs an EmailSender instance with a Gmail-based transporter.
   * @constructor
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "seplingenliefert@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: process.env.accessToken,
      },
    });
  }

  /**
   * Sends an email using an EJS template.
   * @param {string} templatePath - The path to the EJS template file.
   * @param {object} data - The data to be rendered in the template.
   * @param {string} toEmail - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @throws {Error} If there is an error sending the email.
   */
  async sendEmail(templatePath, data, toEmail, subject) {
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const html = ejs.render(template, data);

      const mailOptions = {
        from: "seplingenliefert@gmail.com",
        to: toEmail,
        subject: subject,
        html: html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  /**
   * Sends an order-related email.
   * @param {object} orderData - Data related to the order.
   * @param {string} toEmail - The recipient's email address.
   */
  async sendOrderEmail(orderData, toEmail) {
    const templatePath = path.join("/home/webtech/new_sep5/public/order_template.ejs");
    const subject = "New Order with the ID: " + orderData.orderID;
    await this.sendEmail(templatePath, orderData, toEmail, subject);
  }

  /**
   * Sends a statistics-related email.
   * @param {object} statsData - Data related to the statistics.
   * @param {string} toEmail - The recipient's email address.
   */
  async sendStatisticsEmail(statsData, toEmail) {
    const templatePath = path.join(__dirname, "statistics_template.ejs"); // Path to your EJS template file for statistics
    const subject = "Monthly Statistics";
    await this.sendEmail(templatePath, statsData, toEmail, subject);
  }
}

module.exports = EmailSender;
