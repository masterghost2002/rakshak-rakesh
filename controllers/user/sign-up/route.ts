import { Request, Response } from "express";
import cryptr from "../../../util/cryptr";
import User from '../../../schemas/user.schema';
import ApiResponse from "../../../util/api-response";
import UserDataValidator from "../../../schemas/validator/user-data.validator";
const PUT = async (req: Request, res: Response) => {
    try {
        const {userData} = req.body;
        const parsedData = UserDataValidator.safeParse(userData);
        if(!parsedData.success)
            return res.status(400).json(new ApiResponse(400, {type:'validation', result:parsedData.error.errors}, 'Invalid data'));
        const data = parsedData.data;
        const hashedPassword = cryptr.encrypt(data.password);
        data.password = hashedPassword;
        const user = await User.create(data);
        return res.status(200).json(new ApiResponse(200, user, 'User created successfully'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, {}, 'An error occurred'));
    }
};  
export default PUT;