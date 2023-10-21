import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import UserController from "../controllers/userController.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get("/:role/me", verifyToken, checkRole, UserController.getMe);

export default router;