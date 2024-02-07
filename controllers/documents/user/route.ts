import { Request, Response } from 'express';
import Document from '../../../schemas/document.schema'
import ApiResponse from '../../../util/api-response';
const GET = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    try{
        const documents = await Document.find({user: user._id});
        return res.status(200).json(new ApiResponse(200, documents, 'Documents retrieved successfully'));
    }catch(error){
        console.log('error', error);
        return res.status(500).json(new ApiResponse(500,{}, 'An error occurred'));
    }
};
export default GET;