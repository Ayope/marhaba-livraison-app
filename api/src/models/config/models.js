import * as schemas  from "./schemas.js";
import mongoose from "mongoose";

const roleModel = mongoose.model('Role', schemas.RoleSchema);
const userModel = mongoose.model('User', schemas.UserSchema);

export {userModel, roleModel}