import AuthModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import validation from "../requests/authValidation.js"; 
import RoleModel from "../models/roleModel.js";
import sendEmail from "../helpers/sendEmails.js";
import { config } from "dotenv";
import tokenHandler from "../helpers/tokenHandler.js";
config();

export default class AuthController{
    
    static async register(req, res) {
        if(!req.cookies.token){

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
    
                sendEmail(registeredUser, 'verification');
    
                res.status(200).json({
                    success : "Registered successfully, Check your inbox for verification email"
                });
    
            }catch(error){
                if (error.code === 11000 && error.keyPattern.email) {
                    res.status(500).json({
                        error : "Email address is already in use."
                    });
                }else{
                    res.status(500).json({
                        error : error
                    });
                }
            }
        }else{
            res.json({
                'error': "You're already logged in, logged out first!"
            })
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
        if(!req.cookies.token){
            try{
                const { error } = validation.validateLogin(req, res);
                
                if(error){
                    validation.errorHandler(error);
                }
        
                const {email, password} = req.body;
                
                const user = await AuthModel.getUserByEmail(email);
        
                if(user){
                    if(await bcryptjs.compare(password, user.password)){
                        if(user.isVerified){
                            const token = tokenHandler.signToken({ userId: user._id }, process.env.JWT_SECRET_KEY, '7 days')
                            res.cookie("token", token)
                            
                            req.user = user;
                            const role = user.role.title
                            
                            if(role === "manager"){
                                res.redirect('/api/user/manager/me'); 
                            }else if(role === "client"){
                                res.redirect('/api/user/client/me');
                            } else if(role === "livreur"){
                                res.redirect('/api/user/livreur/me'); 
                            }
                            
                            // res.status(200).json({
                            //     "success" : "You logged in successfully, Enjoy!",
                            // });
                        }else{
                            sendEmail(user, 'verification');
    
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
        }else{
            res.json({
                'error': "You're already logged in, logged out first!"
            })
        }
    }

    static async forgetPassword(req, res){
        try{

            const { error } = validation.validateForgotPassword(req, res);
                
            if(error){
                validation.errorHandler(error);
            }

            const { email } = req.body;
            
            const user = await AuthModel.getUserByEmail(email);
    
            if(user){
                sendEmail(user, 'reset');
                res.status(200).json({
                    "success" : "Verify your inbox for Reset Password email",
                });
            }else{
                res.status(400).send("User Not Found");
            }
        }catch(error){
            res.status(500).send(error);
        }
    }

    static async resetPassword(req, res){
        
        try{

            const { error } = validation.validatePassword(req, res);
                
            if(error){
                validation.errorHandler(error);
            }

            const user = req.user;

            const { password } = req.body;

            const hashedPassword = await bcryptjs.hash(password, 10);
                
            user.password = hashedPassword;
        
            if(!await user.save()){
                return res.status(500).send("Something went wrong on our side, try again later !")
            }else{
                return res.status(200).json({
                    "success" : "Your password changed successfully",
                });
            }

        }catch(error){
            res.status(500).send(error);
        }
    }

    static logout(req, res){
        res.clearCookie("token").status(200).send("Logged out successfully");
    }
}