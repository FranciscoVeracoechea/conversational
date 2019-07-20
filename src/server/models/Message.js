import mongoose, { Schema } from 'mongoose';
import { ImageSchema } from './Image';


export const MessageSchema = new Schema({
  text: {
    type: String,
  },
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
});

export const Message = mongoose.model('Message', MessageSchema);
