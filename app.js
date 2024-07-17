import express, { Router } from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';
import connectDB from "./db/db.js"
import userRouter from "./routes/userRoutes.js"
import bookRouter from "./routes/bookRoutes.js"
import transactionRouter from "./routes/transactionRoutes.js"




dotenv.config()

const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/uploads', express.static('uploads'));

const whitelist = ['http://localhost:3000', 'https://cavegigitlclientside.netlify.app'];

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

app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)
app.use("/api/transaction", transactionRouter)

app.get("/", (req, res) => {
    res.status(200).send({ message: "Server is working" })
})

export default app