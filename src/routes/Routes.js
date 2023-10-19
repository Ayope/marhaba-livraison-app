import express from "express";
import AuthController from "../controllers/authController.js";
import upload from "../helpers/storeImage.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", upload.single('image'), AuthController.register);
router.get("/verify",verifyToken, AuthController.verifyAccount);


export default router;