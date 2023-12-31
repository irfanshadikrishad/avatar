import dotenv from "dotenv";
import chalk from "chalk";
import express from "express";
import { connect } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import multer from "multer";
import path from "path";
import ip from "ip";
import User from "./models/user.js";
import { fileURLToPath } from "url";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'avatars');
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "https://mern-avatar.netlify.app"
}));
app.use("/avatars", express.static(path.join(__dirname, "avatars")));

connect(uri).then(() => {
    console.log(chalk.cyan(`[ok] database`));
}).catch((error) => {
    console.log(chalk.yellow(`[error] database : ${error}`));
})

app.get('/', async (req, res) => {
    await User.find({}).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(404).json({ error: error });
    })
})
app.post('/', upload.single('avatar'), async (req, res) => {
    const { name } = await req.body;
    const avatar = await req.file.filename;
    const user = new User({
        name, avatar
    });
    await user.save().then(data => {
        console.log(chalk.cyan(`[ok] user saved : ${data}`));
        res.status(201).json({ message: "Submitted" });
    }).catch(error => {
        console.log(chalk.yellow(`[error] user saving error: ${error}`));
        res.status(400).json({ error: error });
    })
})
app.get('/avatars', async (req, res) => {
    User.find({}).sort({ createdAt: -1 }).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).json({ error: error });
    })
})
app.delete('/delete', async (req, res) => {
    const { id } = await req.body;
    User.findOne({ _id: id }).then(data => {
        console.log(chalk.cyan(`[ok] /findOne`, data));
        const { avatar } = data;
        User.deleteOne({ _id: id }).then(data => {
            fs.unlink(`${__dirname}/avatars/${avatar}`, function (err) {
                if (err) {
                    console.log(chalk.yellow(`[error] /delete unlink : ${err}`));
                } else {
                    console.log(chalk.cyan(`[ok] ${avatar} —deleted`));
                }
            });
            res.status(200).json({ message: "Deleted" });
        }).catch(error => {
            console.log(chalk.yellow(`[error] /deleteOne : ${error}`));
            res.status(404).json({ error: error });
        })
    }).catch(error => {
        console.log(chalk.yellow(`[error] /delete : ${error}`));
        res.status(404).json({ error: error });
    })
})

app.listen(PORT, (error) => {
    error ? console.log(chalk.yellow(`[error] listen : ${error}`)) :
        console.log(chalk.cyan(`[ok] ${PORT} : ${ip.address()}`))
})