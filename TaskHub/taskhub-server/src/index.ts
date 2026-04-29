import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import { startCronJobs } from './services/cronService.js';

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

if (!MONGO_URI) {
    console.error('Помилка: MONGO_URI не знайдено у файлі .env');
    process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Успішно підключено до MongoDB!');

        startCronJobs(); 
        console.log("⏱️ Cron jobs initialized");
        
        app.listen(PORT, () => {
            console.log(`Сервер працює на http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Помилка підключення до MongoDB:', error);
    });