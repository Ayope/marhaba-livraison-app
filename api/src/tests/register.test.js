import AuthController from "../controllers/authController";
import {jest} from '@jest/globals'

const res = {
    status : jest.fn().mockReturnThis(),
    json : jest.fn(),
}

describe("Register a user", () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });

    it("Should return status 200 after the register successfully", async () => {
        const req = {
            body : {
                name : "ayoub el ayouk",
                email : "ayoubelayouk@gmail.com", 
                password : "abcd1234", 
                phoneNumber : "0678129024", 
                address : "the address", 
                role : "client"
            },
            file : {
                filename : "photo.png"
            },
            cookies : {}
        }

        await AuthController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            success : "Registered successfully, Check your inbox for verification email"
        })
    })
})