import AuthModel from "../models/authModel.js";

export default class clientsController{
    static async getAllClients(req, res){
        const users = await AuthModel.getAllClients();
        res.status(200).send(users)
    }
}