import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctOptionIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3 
  },
  category: {
    type: String,
    enum: ['Medical', 'Vehicle', 'Road'], // Define your categories here
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;