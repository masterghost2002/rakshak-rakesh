const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  secureUrl: {
    type: String,
    required: true,
    unique: true
  },
  format:{
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Document = mongoose.model('Document', documentSchema);
export default Document;
