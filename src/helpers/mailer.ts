import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
    // create a hashedToken 
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
       

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,verifyTokenExpire:Date.now() + 3600000
            })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,forgotPasswordExpire:Date.now() + 3600000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
        }
    });
    const resetLink = emailType === "VERIFY"
      ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
      : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`;
    const html = `
            <p>Click <a href="${resetLink}">here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
        }</p>
            <p>Or copy and paste the link below into your browser:</p>
            <p>${resetLink}</p>
        `;
    const mailOptions = {
        from:"targeter001@gmail.com",
        to:email,
        subject:emailType === "VERIFY"?"Verify your email":"Reset your password",
        html
    }
    
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;


    }catch(error:any){
        throw new Error(error.message)
    }
}