import express from "express";
import dotenv from "dotenv";
import { crudCharacter } from "./api/crud";

dotenv.config();

const PORT: number = parseInt(process.env.API_PORT as string) || 3000;

const app = express();

app.listen(PORT, async () => {
    console.log(`app runing on http://127.0.0.1:${PORT}.`);

    crudCharacter.getMulti();
}); 