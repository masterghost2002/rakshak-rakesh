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
    enum: ['PASS', 'FAIL', 'TERMINATED'],
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  isTerminated: {
    type: Boolean,
  },
  correct: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  validTill: {
    type: Date,
  },
  categoryWisePerformance: [categoryPerformanceSchema],
});
assessmentResultSchema.pre('save', function(next) {
  // Check if createdAt is set and validTill is not set
  if (this.createdAt && !this.validTill) {
      const validTillDate = new Date(this.createdAt);
      // Add 20 years to createdAt date
      validTillDate.setFullYear(validTillDate.getFullYear() + 20);
      this.validTill = validTillDate;
  }
  next();
});
const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);
export default AssessmentResult;
