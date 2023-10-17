import * as schemas  from "./schemas.js";
import mongoose from "mongoose";

const userModel = mongoose.model('User', schemas.UserSchema);

export {userModel}