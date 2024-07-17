import express, { Router } from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';
import connectDB from "./db/db.js"
import { registerUser, loginUser } from "./controller/userController.js"
import { verifyJWT } from "./config/jwt.js"



dotenv.config()

const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());




const whitelist = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};


app.use(cors(corsOptions));

connectDB()

app.post("/v1/api/register", registerUser)
app.post("/v1/api/login", loginUser)



app.get("/", (req, res) => {
    res.status(200).send({ message: "Server is working" })
})

export default app