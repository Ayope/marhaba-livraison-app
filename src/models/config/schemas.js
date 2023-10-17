import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    image : String,
    phoneNumber : String,
    address : String,
    role : {
        type: String,
        enum : ['client', 'livreur', 'admin']
    }
});

export {UserSchema}