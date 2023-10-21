import express  from "express";
import { connectDb } from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import generateJwtSecretKeyInEnvFile from "./helpers/generateSecretKey.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

connectDb();
generateJwtSecretKeyInEnvFile();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`port is running at ${port}`);
})