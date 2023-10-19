import transporter from "../config/nodemailer.js";
import { config } from "dotenv";
import tokenHandler from "../helpers/tokenHandler.js";
config();

export default class SendEmail {

    static sendVerificationEmail(receiver){
        
        const token = tokenHandler.signToken({ userId: receiver._id }, process.env.JWT_SECRET_KEY, '10m');

        const mailOptions = {
            from : `${process.env.APP_NAME} <${process.env.USER}>`,
            to : receiver.email,
            subject : "Verification email",
            html: `
                <h1>Welcome to Marhaba Livraison!</h1>
                <p>Please click the following link to verify your email address:</p>
                <a href="http://localhost:3000/verify?token=${token}">Verify Email</a>
                <p>This Link is valid only for 10 minutes</p>
                `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                throw new Error(error.message)
            }
        })

    }

}