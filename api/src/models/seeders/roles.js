import { roleModel } from "../config/models.js";
import roles from "../factory/roles.js";

export default async function seedRoles(){
    if((await roleModel.find({})).length === 0){
        await roleModel.insertMany(roles).then(() => { console.log("Roles are seeded"); }).catch(function(error){ console.log(error) });
    }
}