import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Form Africa API");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})