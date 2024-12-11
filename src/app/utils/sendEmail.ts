import nodemailer from "nodemailer";

export const sendEmail = async (link: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sudiptodas129866@gmail.com",
      pass: "ylfz eqgs itlv qbnc",
    },
  });

  // send mail
  await transporter.sendMail({
    from: "sudiptodas129866@gmail.com",
    to: `${email}`,
    subject: "Reset you password within 1 hour",
    text: "Click the Link below to reset your password",
    html: link,
  });
};
