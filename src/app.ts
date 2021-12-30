import express from "express";
import dotenv from "dotenv";
import {
    charactersRoute
} from "./api/routes";

dotenv.config();

const PORT: number = parseInt(process.env.API_PORT as string) || 3000;

const app = express();

app.use(express.json());
app.use("/characters", charactersRoute);

app.listen(PORT, async () => {
    console.log(`app runing on http://127.0.0.1:${PORT}.`);
});