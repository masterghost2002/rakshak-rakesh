import { Request, Response } from "express";
import cryptr from "../../../util/cryptr";
import ApiResponse from "../../../util/api-response";
import generateToken from "../../../util/generate-token";
const POST = async (req: Request, res: Response) => {
    if (!req.user)
        return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    try {
        const {password:hashedPassword, ...user} = req.user;
        const decryptedPassword = cryptr.decrypt(hashedPassword);
        const isPasswordMatched = decryptedPassword === req.body.credentials?.password;
        if (!isPasswordMatched)
            return res.status(400).json(new ApiResponse(400, { type: 'validation', result: [{ path: ['password'], message: 'Password is incorrect' }] }));
        const accessToken = await generateToken(user);
        req.session.accessToken = accessToken;
        return res.status(200).json(new ApiResponse(200, user, 'User signed in successfully'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, {}, 'An error occurred'));
    }
};
export default POST;