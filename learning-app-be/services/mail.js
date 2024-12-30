import nodemailer from "nodemailer";
const sendEmail = async (email, newPassword) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Mật khẩu của bạn DuyLingo",
    html:
      `<h3>Mật khẩu mới của bạn là : ${newPassword}</h3>
      <p>Hãy sử dụng mật khẩu này đăng nhập lại tại <a href="#">DuyLingo</a></p>
      <b>Lưu ý: Hãy thay đổi mật khẩu của bạn ngay sau khi đăng nhập thành công!</a></b>`
  };
  transporter.sendMail(mailOptions)
};

export default sendEmail;