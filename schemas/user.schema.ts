import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    results:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssessmentResult'
    }],
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
