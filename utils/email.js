const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Lucas ANDRIANARIJAONA <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendingblue
      return nodemailer.createTransport({
        host: process.env.SENDINGBLUE_HOST,
        port: process.env.SENDINGBLUE_PORT,
        auth: {
          user: process.env.SENDINGBLUE_USERNAME,
          pass: process.env.SENDINGBLUE_PASSWORD
        }
      });
    }

    // // 1) Create a transporter
    // return nodemailer.createTransport({
    //   //servie: 'Gmail',
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    //   // Activate in gmail "less secure app" option
    // });

    return nodemailer.createTransport({
      host: process.env.SENDINGBLUE_HOST,
      port: process.env.SENDINGBLUE_PORT,
      auth: {
        user: process.env.SENDINGBLUE_USERNAME,
        pass: process.env.SENDINGBLUE_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    // welcome.pug is the template
    await this.send('welcome', 'welcome to the Tours Mada Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 minutes)'
    );
  }
};
