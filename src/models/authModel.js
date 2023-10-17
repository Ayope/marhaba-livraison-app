import { userModel } from "./config/models.js";

export default class AuthModel{

    constructor(fullName, photo, email, password, phoneNumber, address, role) {
        this.fullName = fullName;
        this.photo = photo;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.role = role;
    }

    async register(){
        const user = await userModel.create({
            name : this.name,
            image : this.image,
            email : this.email,
            password : this.password,
            phoneNumber : this.phoneNumber,
            address : this.address,
            role : this.role
        })

        return user;    
    }
}