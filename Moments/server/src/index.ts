import express, { Application } from "express"; // const express = require('express');
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from '../routes/posts'
import userRoutes from '../routes/users'
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const CONNECTION_URL: string = process.env.CONNECTION_URL

const PORT: number | string = process.env.PORT || 5000
mongoose.connect(CONNECTION_URL,)
    .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
    .catch((error) => console.log("some error", error))

// mongoose.set('useFindAndModify', false)

