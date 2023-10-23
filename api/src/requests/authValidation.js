import Joi from "joi";


export default class AuthValidation{

    static validateRegister(req, res){
        
        const schema = Joi.object({
            name : Joi.string().required(), 
            email : Joi.string().email().required(), 
            image : Joi.string(),
            password : Joi.string().min(8)
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)/)
            .message('"password" must contain alphabetic and numerical characters')
            .required(),
            phoneNumber : Joi.string().regex(/^(06|05|07)\d{8}$/).required(),
            address : Joi.string().required(),
            role : Joi.string().valid('client', 'livreur').required()
        }).options({allowUnknown:true})

        return schema.validate(req.body , {abortEarly: false});
        
    }

    static validateLogin(req, res){
        
        const schema = Joi.object({
            email : Joi.string().email().required(), 
            password : Joi.string().min(8)
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)/)
            .message('"password" must contain alphabetic and numerical characters')
            .required(),
        }).options({allowUnknown:true})

        return schema.validate(req.body , {abortEarly: false});
        
    }

    static validateForgotPassword(req, res){
        
        const schema = Joi.object({
            email : Joi.string().email().required(), 
        }).options({allowUnknown:true})

        return schema.validate(req.body , {abortEarly: false});
        
    }

    static validatePassword(req, res){        
        const schema = Joi.object({
            password : Joi.string().min(8)
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)/)
            .required()
            .messages({
                'string.pattern.base': '"Password" must contain alphabetic and numerical characters',
            }),
            
            confirmedPassword : Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .label('Confirmed Password')
            .messages({
                'any.only': '"Confirmed Password" should be the same as the "Password"',
            }),

            
        }).options({allowUnknown:true})

        return schema.validate(req.body , {abortEarly: false});
        
    }

    static errorHandler(error){
        const validationErrors = error.details.map((detail) => {
            return {
                field: detail.context.key,
                message: detail.message,
            };
        });
        
        const errorMessage = `${validationErrors
            .map((error) => `${error.message}`)
            .join(', \n')}`;
            
        throw errorMessage;
    }
}