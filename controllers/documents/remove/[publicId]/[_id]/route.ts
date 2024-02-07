import { Request, Response } from 'express';
import ApiResponse from '../../../../../util/api-response';
import uploader from "../../../../../util/cloudinary";
import User from '../../../../../schemas/user.schema';
import Document from '../../../../../schemas/document.schema';
const DELETE = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    const publicId = req.params.publicId;
    const _id = req.params._id;
    try {
        const existingUser = await User.findById(user._id);
        if(!existingUser)
            return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
        await uploader.destroy(publicId);
        await Document.findByIdAndDelete(_id);
        existingUser.documents = existingUser.documents.filter(doc => doc._id.toString() !== _id);
        await existingUser.save();
        return res.status(200).json(new ApiResponse(200, {}, 'Document deleted successfully'));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, {}, 'Internal server error'));
    }
};
export default DELETE;