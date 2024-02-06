import jwt, { Secret } from 'jsonwebtoken';
import config from '../config/config';
import { UserType } from '../types';
const jwtSecret:Secret = config.jwtSecret;
const generateToken = async (data:Omit<UserType, 'password'>)=>{
    let token:string;
    try {
        token = await jwt.sign(data, jwtSecret, { expiresIn: '60d' });
    } catch (error) {
        throw error;
    }
    return token;
};
export default generateToken;