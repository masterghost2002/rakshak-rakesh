import { Request, Response } from "express";
import cryptr from "../../../util/cryptr";
import User from '../../../schemas/user.schema';
import ApiResponse from "../../../util/api-response";
import UserDataPartialValidator from "../../../schemas/validator/user-data-partial.validator";
import generateToken from "../../../util/generate-token";
const POST = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
        const {userData} = req.body;
        const parsedData = UserDataPartialValidator.safeParse(userData);

        // if the parsedData is not successful, return a 400 status code with the error
        if(!parsedData.success)
        return res.status(400).json(new ApiResponse(400, {type:'validation', result:parsedData.error.errors}, 'Invalid data'));

        // if the password is present and is at least 8 characters long, encrypt it
        if(parsedData.data.password && parsedData.data.password.length>=8) parsedData.data.password = cryptr.encrypt(parsedData.data.password);

        // remove the password from the parsedData
        else delete parsedData.data.password;
        const result = await User.findOneAndUpdate({email: user.email}, parsedData.data, {new: true});

        if(!result) return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));

        const {password,_id, ...data} = result.toObject();
        const accessToken = await generateToken({_id:_id.toString(),...data});
        return res.status(200).json(new ApiResponse(200, {...data, accessToken}, 'User created successfully'));
    } catch (error: any) {

        if(error.code === 11000)
            return res.status(409).json(new ApiResponse(409, {type:'duplicacy', result: [{ path: ['email'], message: 'Email already exists' }]}, 'Email already exists'));
        return res.status(500).json(new ApiResponse(500, {}, 'An error occurred'));
    }
};  
export default POST;