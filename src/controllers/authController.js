import AuthModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import validation from "../requests/authValidation.js"; 
import RoleModel from "../models/roleModel.js";
import SendEmail from "../helpers/sendEmails.js";
import { config } from "dotenv";
import tokenHandler from "../helpers/tokenHandler.js";
config();

export default class AuthController{
    
    static async register(req, res) {
        try {
            const { error } = validation.validateRegister(req, res);

            if(error){
                validation.errorHandler(error);
            }

            const { name, email, password, phoneNumber, address, role } = req.body;
            
            const hashedPassword = await bcryptjs.hash(password, 10);
            
            const image = req.file ? req.file.filename : null;

            const roleId = await RoleModel.getRoleId(role);

            const user = new AuthModel(name, image, email, hashedPassword, phoneNumber, address, roleId);
        
            const registeredUser = await user.register();

            SendEmail.sendVerificationEmail(registeredUser);

            res.status(200).json({
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

    static async login(req, res){
        try{
            const { error } = validation.validateLogin(req, res);
            
            if(error){
                validation.errorHandler(error);
            }
    
            const {email, password} = req.body;
            
            const user = await AuthModel.login(email);
    
            if(user){
                if(bcryptjs.compare(password, user.password)){
                    if(user.isVerified){
                        const token = tokenHandler.signToken({ userId: user._id }, process.env.JWT_SECRET_KEY, '7 days')
                        res.cookie("token", token)

                        res.status(200).json({
                            "success" : "You logged in successfully, Enjoy!",
                        });
                    }else{
                        SendEmail.sendVerificationEmail(user);

                        res.status(401).json({
                            "error" : "Verify your account first to use the application !"
                        });
                    }
                }else{
                    res.status(400).json({
                        'error': "Incorrect password",
                    })
                }
            }else{
                res.status(400).json({
                    'error': "Email not found"
                })
            }

        }catch(error){
            res.status(500).send(error);
        }
    }

    static async
}