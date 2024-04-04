import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import allRoutes from './routes/all.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import response from './utils/response.util.js';
import swaggerUi from 'swagger-ui-express';
import docs from './documentation/index.js'
import multer from 'multer';

const app = express();
const corsOpts = {
    origin: '*',
    
    methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT'
    ],
    
    allowedHeaders: [
    'Content-Type',
    'Authorization',
    ],
    };
app.use(cors(corsOpts));
dotenv.config();
app.use(cookieParser())
app.use(bodyParser.json())


app.get('/',(req, res) => response.success(res, 200,"welcome to the back-end of my project use /api-docs to get the swagger documentation "));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(docs));
app.use(allRoutes);
const port = process.env.PORT;
mongoose.set('strictQuery', true);
 mongoose.connect("mongodb+srv://richard:richard123@cluster0.hxne8xj.mongodb.net/my-brand-back-end?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to the database');
 }).catch((err) => {
    console.log('error', err);
 });
 app.listen(4000);
 console.log(`the server is listening at http://localhost:${4000}`);
