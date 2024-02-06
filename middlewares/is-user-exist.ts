import { Request, Response, NextFunction } from "express";
import findUserUsingEmail from "./find-user-using-email";
import ApiResponse from "../util/api-response";
const isUserExist = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const email = req.body.email;
        const user = await findUserUsingEmail(email);
        if(!user)
            return res.status(404).json(new ApiResponse(404, {type:'not-found', result:[{path:['email'], message:'User not found'}]}));
        req.user = user;
        next();
    } catch (error) {
        return 
    }
};
export default isUserExist;