import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to database"))

const app = express();

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health ok!" })
})

app.use("/api/my/user", myUserRoute)

app.listen(7000, () => {
    console.log("Server started at Localhost:7000")
})