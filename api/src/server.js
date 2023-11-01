import express  from "express";
import { connectDb } from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import generateJwtSecretKeyInEnvFile from "./helpers/generateSecretKey.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './config/swagger.js'

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials : true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

connectDb();
generateJwtSecretKeyInEnvFile();


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.listen(port, () => {
    console.log(`port is running at ${port}`);
})