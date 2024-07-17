import express from "express";
import dotenv from "dotenv"

import appPage from "./app.js"

const app = express()
app.use(appPage)
dotenv.config()

app.listen(process.env.PORT, function (req, res, next) {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
})