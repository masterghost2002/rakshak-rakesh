import dotenv from 'dotenv';
dotenv.config();
require('./database/db');
import express, { Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import USERROUTES from './routes/user.routes';
import DOCUMENTROUTES from './routes/documents.routes';
import config from './config/config';
declare module 'express-session' {
    export interface SessionData {
        accessToken: string;
    }
}
const PORT = process.env.PORT || 5000;
const server = express();
server.use(cors({
    origin: '*'
}));
server.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
}));
server.use(express.json());
server.get('/api/health', (req: Request, res: Response) => res.status(200).json('Server is running'));
server.use('/api/user', USERROUTES);
server.use('/api/documents', DOCUMENTROUTES);
server.listen(PORT, () => console.log('Listening  to port ', PORT));
