import { Request, Response, NextFunction } from "express";
import findUserUsingEmail from "./find-user-using-email";
import ApiResponse from "../util/api-response";
const notUserExist = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const email = req.body.userData.email;
        const user = await findUserUsingEmail(email);
        if(user)
            return res.status(409).json(new ApiResponse(409, {type:'duplicacy', result:[{path:['email'], message:'Email already exist'}]}));
        next();
    } catch (error) {
        return 
    }
};
export default notUserExist;