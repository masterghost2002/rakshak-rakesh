import ApiResponse from "../../../util/api-response";
import User from "../../../schemas/user.schema";
import Question from "../../../schemas/question.schema";
import AssessmentResult from "../../../schemas/assessment-result.schema";
import { Request, Response } from "express";
const POST = async (req: Request, res: Response) => {
    const user = req.user;
    console.log(user);
    if(!user)  return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));
    try{
        const {selectedOptions, assessment, isTerminated} = req.body;
        let {remarks} = req.body;

        const answers = await Promise.all(selectedOptions.map(async (item:{questionId:string, selectedOption:number}) => {
            const question = await Question.findById(item.questionId);
            return{
                questionId: item.questionId,
                correctOption: question?.correctOptionIndex,
                category: question?.category,
                isCorrect: question?.correctOptionIndex === item.selectedOption,
            }
        }));
  
        // create result
        const totalRoadQuestions = answers.filter((item:any) => item.category === 'Road').length;
        const totalVehicleQuestions = answers.filter((item:any) => item.category === 'Vehicle').length;
        const totalMedicalQuestions = answers.filter((item:any) => item.category === 'Medical').length;

        const correctRoadQuestions = answers.filter((item:any) => item.category === 'Road' && item.isCorrect === true).length;
        const correctVehicleQuestions = answers.filter((item:any) => item.category === 'Vehicle' && item.isCorrect === true).length;
        const correctMedicalQuestions = answers.filter((item:any) => item.category === 'Medical' && item.isCorrect === true).length;

        const existingUser = await User.findById(user._id);
        if(!existingUser) return res.status(404).json(new ApiResponse(404, { type: 'not-found', result: [{ path: ['email'], message: 'User not found' }] }));

        let totalCorrect = correctRoadQuestions + correctVehicleQuestions + correctMedicalQuestions;
        totalCorrect = isTerminated ? 0 : totalCorrect;


        let overall = totalCorrect >= assessment.passingQuestions ? 'PASS' : 'FAIL';
        overall = isTerminated ? 'TERMINATED' : overall;
        if(overall === 'TERMINATED') remarks = 'Assessment Terminated user found to be cheating';

        
        const result = new AssessmentResult({
            userId: user._id,
            overall,
            totalQuestions: assessment.totalQuestions,
            remarks,
            isTerminated,
            correct: totalCorrect,
            categoryWisePerformance: [
                {
                    category: 'Road',
                    totalQuestions: totalRoadQuestions,
                    correct:isTerminated?0:correctRoadQuestions,
                },
                {
                    category: 'Vehicle',
                    totalQuestions: totalVehicleQuestions,
                    correct:isTerminated?0:correctVehicleQuestions,
                },
                {
                    category: 'Medical',
                    totalQuestions: totalMedicalQuestions,
                    correct:isTerminated?0:correctMedicalQuestions,
                }
            ]
        });  
        
        await result.save();    
        existingUser.results.push(result._id);
        await existingUser.save();
        return res.status(200).json(new ApiResponse(200, result, 'Assessment Result Generated'));
    }catch(error){
        console.log(error);
        res.status(500).json(new ApiResponse(500, {}, 'Internal Server Error'));
    }
    return res.status(200).json('ok');
};
export default POST;