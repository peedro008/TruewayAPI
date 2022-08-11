const nodemailer = require("nodemailer");
 const Main = async ( email) =>{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  try{
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
        user: "truewayagents@gmail.com", // generated ethereal user
        pass: "qxsjttzqismyocow" // generated ethereal password
              
      },
      });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from:  '"Trueway Agents" ', // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: `https://www.truewayagents.com/87545856985854145256?id=${email}`, // plain text body
      html: `<p>Click on the following link to recover your password.</p>
      <b>https://www.truewayagents.com/87545856985854145256?id=${email}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...}
  }
  catch{(console.error);}
}
module.exports = {
Main
  };
  