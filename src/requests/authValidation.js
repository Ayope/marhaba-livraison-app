import Joi from "joi";


export default class AuthValidation{

    static validateRegister(req, res){
        
        const schema = Joi.object({
            name : Joi.string().required(), 
            email : Joi.string().email().required(), 
            image : Joi.string(),
            password : Joi.string().min(8).regex(/^(?=.*[a-zA-Z])(?=.*\d)/).required(),
            phoneNumber : Joi.string().regex(/^(06|05|07)\d{8}$/).required(),
            address : Joi.string().required(),
            role : Joi.string().valid('admin', 'client', 'livreur').required()
        }).options({allowUnknown:true})

        return schema.validate(req.body , {abortEarly: false});
        
    }
}