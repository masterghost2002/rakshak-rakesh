import 'express';
import { UserType } from '../../types'
declare global {
    namespace Express {
        export interface Request {
            user?: UserType;
        }
    }
}