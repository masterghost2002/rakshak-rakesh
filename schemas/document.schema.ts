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
  publicId: {
    type: String,
    required: true,
    unique: true
  }
});

const Document = mongoose.model('Document', documentSchema);
export default Document;
