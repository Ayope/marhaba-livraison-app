import AuthModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import validation from "../requests/authValidation.js"; 
import RoleModel from "../models/roleModel.js";
import SendEmail from "../helpers/sendEmails.js";
import { config } from "dotenv";
config();

export default class AuthController{
    
    static async register(req, res) {
        try {
            const { error } = validation.validateRegister(req, res);

            if(error){
                const validationErrors = error.details.map((detail) => {
                    return {
                      field: detail.context.key,
                      message: detail.message,
                    };
                });
                
                const errorMessage = `${validationErrors
                    .map((error) => `${error.message}`)
                    .join(', \n')}`;
                    
                throw(errorMessage);
            }

            const { name, email, password, phoneNumber, address, role } = req.body;
            
            const hashedPassword = await bcryptjs.hash(password, 10);
            
            const image = req.file ? req.file.filename : null;

            const roleId = await RoleModel.getRoleId(role);

            const user = new AuthModel(name, image, email, hashedPassword, phoneNumber, address, roleId);
        
            const registeredUser = await user.register();

            SendEmail.sendVerificationEmail(registeredUser);

            res.json({
                "success" : "Registered successfully, Check your inbox for verification email"
            });

        }catch(error){
            if (error.code === 11000 && error.keyPattern.email) {
                res.status(500).send("Email address is already in use.");
            }else{
                res.status(500).send(error);
            }
        }
        
    }

    static async verifyAccount(req, res){
        const user = req.user;

        if(user.isVerified){
            return res.status(200).send("User has been already verified. Please Login");
        }else{
            user.isVerified = true;
            
            if(!await user.save()){
                return res.status(500).send("Something went wrong on our side, try again later !")
            }else{
                return res.status(200).send("Your account has been successfully verified");
            }
        }

    }
}