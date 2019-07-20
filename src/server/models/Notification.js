import mongoose, { Schema } from 'mongoose';
import { ImageSchema } from './Image';


export const MessageSchema = new Schema({
  title: {
    type: String, required: true,
  },
  content: String,
  createdAt: {
    type: Date, default: Date.now,
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  read: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  image: ImageSchema,
  type: {
    type: String,
    enum: ['message', 'conversation', 'profile', 'global'],
  },
});

export const Message = mongoose.model('Message', MessageSchema);
