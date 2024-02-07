import mongoose from 'mongoose';
const categoryPerformanceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  // You can add more fields here if needed, like incorrect, percentage, etc.
});

const assessmentResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  overall: {
    type: String,
    enum: ['PASS', 'FAIL'],
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  categoryWisePerformance: [categoryPerformanceSchema],
});

const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);
export default AssessmentResult;
