import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import authRouter from './routes/auth.route.js';
import userRouter from "./routes/user.route.js";
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';


import cookieParser from "cookie-parser";
import FormationRouter from './routes/formation.route.js';
import enrollmentRouter from './routes/enrollment.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/formations', FormationRouter);
app.use('/api/v1/enrollments', enrollmentRouter)

app.use(errorMiddleware);




app.get('/', (req, res) => {
    res.send("Welcome to Form Africa API");
})

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    
    await connectDB();
})

export default app;

