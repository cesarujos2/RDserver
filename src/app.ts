import express from 'express';
import cors from 'cors';
require('dotenv').config();
import {router} from "./routes"

const app = express()
app.use(cors({
    origin: ['*']
}))

app.use(router)

app.listen(process.env.PORT || 3002, () => {
    console.log("Corriendo en el puerto: " + process.env.PORT)
})