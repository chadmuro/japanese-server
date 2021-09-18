import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }],
});

export default mongoose.model('Category', categorySchema);
