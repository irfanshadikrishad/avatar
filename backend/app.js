import dotenv from "dotenv";
import chalk from "chalk";
import express from "express";
import { connect } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import multer from "multer";
import path from "path";
import User from "./models/user.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'avatar');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

dotenv.config();
const PORT = process.env.PORT || 3001;
const uri = process.env.URI;
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

connect(uri).then(() => {
    console.log(chalk.cyan(`[ok] database`));
}).catch((error) => {
    console.log(chalk.yellow(`[error] database : ${error}`));
})


app.get('/', (req, res) => res.status(200).send('/'));
app.post('/', upload.single('avatar'), async (req, res) => {
    const { avatar } = await req.body;
    console.log(chalk.cyan(`[ok] body : ${req.body}`));
    console.log(chalk.cyan(`[ok] post avatar : ${avatar}`));
})

app.listen(() => {
    console.log(chalk.cyan(`[ok] ${PORT}`));
})