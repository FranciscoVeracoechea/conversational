import mongoose, { Schema } from 'mongoose';
import { ImageSchema } from './Image';


const CategorySchema = new Schema({
  name: {
    type: String, required: true, unique: true,
  },
  createdAt: {
    type: Date, default: Date.now,
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  image: ImageSchema,
});

export default mongoose.model('Category', CategorySchema);
