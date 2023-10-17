import AuthModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import validation from "../requests/authValidation.js"; 

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

            const { fullName, email, password, phoneNumber, address } = req.body;
            
            const hashedPassword = await bcryptjs.hash(password, 10);
            
            const photo = req.file ? req.file.filename : null;

            const user = new AuthModel(fullName, photo, email, hashedPassword, phoneNumber, address);
        
            await user.register();

            res.json({
                "success" : "Registered successfully"
            });

        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
        
    }
}