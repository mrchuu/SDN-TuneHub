import nodemailer from 'nodemailer';

const sendNewPasswordEmail = async (email, newPassword) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'New Password',
        html: `
      <p>Hello,</p>
      <p>Your new password for your account is: <strong>${newPassword}</strong></p>
      <p>Please use this password to log in and consider changing it to a more secure one.</p>
      <p>Click <a href="http://localhost:3000/login">here</a> to login.</p>
    `
    };

    await transporter.sendMail(mailOptions);
};

export default { sendNewPasswordEmail };
