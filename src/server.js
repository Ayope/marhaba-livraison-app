import express  from "express";
import { connectDb } from "./database.js";
import router from "./routes/Routes.js";

const app = express();
const port = 3000;

app.use(express.json());

connectDb();

app.use('/', router)

app.listen(port, () => {
    console.log(`port is running at ${port}`);
})