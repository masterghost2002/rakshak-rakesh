import { Request, Response } from 'express';
import ApiResponse from "../../util/api-response";
import Assessment from "../../schemas/assessment.schema";
import Question from "../../schemas/question.schema";
const GET = async (req: Request, res: Response) => {
    try {
        const assessment = await Assessment.findOne();
        if(!assessment) return res.status(404).json(new ApiResponse(404, {}, 'Assessment not found'));

        // populate is not working, not sure why , currently using this approach
        const questions = await Promise.all(assessment.questions.map(async (questionId: any) => await Question.findById(questionId).select('-correctOptionIndex')));
        return res.status(200).json(new ApiResponse(200, {assessment,questions}, 'Assessment found'));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiResponse(500, {}, 'Internal Server Error'));
    }
};
export default GET;