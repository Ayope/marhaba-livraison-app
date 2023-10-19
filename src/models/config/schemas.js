import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    image : String,
    phoneNumber : String,
    token : String,
    address : String,
    role : {
        type: mongoose.Types.ObjectId,
        ref : "Role"
    },
    isVerified : Boolean
});

const RoleSchema = new mongoose.Schema({
    title : String
});

export {UserSchema, RoleSchema}