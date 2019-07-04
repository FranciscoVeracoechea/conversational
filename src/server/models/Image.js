import mongoose, { Schema } from 'mongoose';


export const ImageSchema = new Schema({
  kind: {
    type: String,
    enum: ['thumbnail', 'detail'],
    required: true,
  },
  url: { type: String, required: true },
});

export const Image = mongoose.model('Image', ImageSchema);
