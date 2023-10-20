import express  from "express";
import { connectDb } from "./config/database.js";
import router from "./routes/Routes.js";
import generateJwtSecretKeyInEnvFile from "./helpers/generateSecretKey.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

connectDb();
generateJwtSecretKeyInEnvFile();

app.use('/', router);

app.listen(port, () => {
    console.log(`port is running at ${port}`);
})