import { Request, Response } from "express";
import fs from "fs";
import uploader from "../../../util/cloudinary";
import ApiResponse from "../../../util/api-response";
import mongoose from "mongoose";
import User from "../../../schemas/user.schema";
import Document from "../../../schemas/document.schema";
const POST = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));

    try {
        if(!req.file)
            return res.status(400).json(new ApiResponse(400,{}, 'No file uploaded'))   ;
        const result = await uploader.upload(req.file.path);
        if(!result)
            return res.status(500).json(new ApiResponse(500,{}, 'Error uploading file'));
        const {secure_url, public_id, format} = result;
        const {name} = req.body;
        
        const existingUser = await User.findOne({email: user.email});
        if(!existingUser)
        return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    
        const document = new Document({name, secureUrl:secure_url, publicId:public_id, user: existingUser._id, format});
        const mongooseSession = await mongoose.startSession();
        mongooseSession.startTransaction();
        await document.save({mongooseSession});
        existingUser.documents.push(document);
        await existingUser.save();
        await mongooseSession.commitTransaction();
        fs.unlinkSync(req.file.path);
        return res.status(200).json(new ApiResponse(200, document, 'Document uploaded successfully'));
    } catch (error) {
        console.log('error', error);
        if(req.file && req.file.path)
            fs.unlinkSync(req.file.path);
        return res.status(500).json(new ApiResponse(500,{}, 'Error uploading file'));
    }
};
export default POST;