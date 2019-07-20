import mongoose, { Schema } from 'mongoose';


export const ImageSchema = new Schema({
  kind: {
    type: String,
    enum: ['thumbnail', 'detail', 'profile'],
  },
  url: { type: String },
});

export const Image = mongoose.model('Image', ImageSchema);
