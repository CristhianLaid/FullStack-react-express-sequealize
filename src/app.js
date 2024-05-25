import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from './routes/authRoute/authRouter.router.js';
import taskRouter from './routes/taskRoute/task.router.js';
import { handleCookies } from "./middlewares/cookies.middleware.js";


const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
    cors({
        credentials: true,
        origin:'http://localhost:5173',
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(handleCookies);

// ------

app.use('/api/auth', authRouter)
app.use('/api/task', taskRouter)


export default app
