import mongoose from "mongoose";
const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    passingQuestions: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;