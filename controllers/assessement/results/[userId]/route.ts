import { Request, Response } from "express";
import ApiResponse from "../../../../util/api-response";
import AssessmentResult from "../../../../schemas/assessment-result.schema";
const GET = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    try{
        const userId = req.params.userId;

        // Check if the user is trying to access their own results
        if(userId !== user._id.toString()) return res.status(403).json(new ApiResponse(403, { type: 'forbidden', result: [{ path: ['email'], message: 'Forbidden' }] }));

        // Fetch the results
        const results = await AssessmentResult.find({ userId: userId });

        // If no results are found
        if(!results) return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'Result not found' }] }));

        return res.status(200).json(new ApiResponse(200, results, 'Results fetched successfully'));
    }catch(err){
        console.error(err);
        return res.status(500).json(new ApiResponse(500, { type: 'internal-server-error', result: [{ path: ['email'], message: 'Internal server error' }] }));
    }
    
};
export default GET;