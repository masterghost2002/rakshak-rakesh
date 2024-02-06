import dotenv from 'dotenv';
dotenv.config();
require('./database/db');
import express, {Request, Response } from 'express';
import cors from 'cors';
import USERROUTES from './routes/user.routes';
const PORT = process.env.PORT || 5000;
const server = express();
server.use(cors({
    origin:'*'
}));
server.use(express.json());
server.get('/api/health', (req:Request, res:Response)=>res.status(200).json('Server is running'));
server.use('/api/user', USERROUTES);
server.listen(PORT, ()=>console.log('Listening  to port ', PORT));
