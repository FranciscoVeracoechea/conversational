import mongoose, { Schema } from 'mongoose';
import { MessageSchema } from './Message';


const ChatSchema = new Schema({
  name: {
    type: String, required: true, unique: true,
  },
  createdAt: {
    type: Date, default: Date.now,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  description: {
    type: String,
  },
  messages: [MessageSchema],
});

export default mongoose.model('Chat', ChatSchema);
