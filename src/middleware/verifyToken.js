import tokenHandler from "../helpers/tokenHandler.js";
import AuthModel from "../models/authModel.js";

export default async function verifyToken(req, res, next){
    const token = req.query.token;
    
    // const token = req.query.token || req.cookies.token; (for later use)

    const tokenData = await tokenHandler.verifyToken(token, process.env.JWT_SECRET_KEY);
    
    if(!tokenData){
        return res.status(400).send({
            error : "Your verification link may have expired !"
        })
    }else{
        const user = await AuthModel.getUser(tokenData.userId);

        if(!user){
            return res.status(401).send({
                error : "We were unable to find a user for this verification. Please SignUp!"
            });
        }else{
            req.user = user;
            next();
        }
    }

}