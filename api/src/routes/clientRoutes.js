import clientsController from "../controllers/clientsController.js";
import express from 'express'

const router = express.Router();

router.get('/clients', clientsController.getAllClients);

export default router