import express from "express";
import AuthController from "../controllers/authController.js";
import upload from "../helpers/storeImage.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", upload.single('image'), AuthController.register);
router.get("/verify",verifyToken, AuthController.verifyAccount);
router.post("/login", AuthController.login);
router.post("/forgot", AuthController.forgotPassword);
router.post("/reset", verifyToken, AuthController.resetPassword);
router.get("/reset", verifyToken, (req, res) => {
    res.send("RESET PASSWORD PAGE");
});


export default router;