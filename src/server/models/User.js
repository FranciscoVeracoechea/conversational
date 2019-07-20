import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import { ImageSchema } from './Image';


const { APP_URL } = process.env;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  description: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  images: {
    type: [ImageSchema],
    default: [{
      kind: 'profile',
      url: `${APP_URL}/statics/profile_male.png`,
    }],
  },
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return crypto.createHmac('sha512', this.salt).update(password).digest('hex');
};

UserSchema.virtual('userId')
  .get(function getUserId() {
    return this.id;
  });

UserSchema.methods.checkPassword = function checkPassword(password) {
  return this.encryptPassword(password) === this.password;
};

UserSchema.pre('save', function presave(next) {
  this.salt = crypto.randomBytes(128).toString('hex');
  this.password = this.encryptPassword(this.password);
  next();
});

export default mongoose.model('User', UserSchema);
