import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';


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
  password: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

UserSchema.pre('save', function presave(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.authenticate = function authenticate(email, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ email })
      .exec((err, user) => {
        if (err) return reject(err);
        if (!user) {
          const error = new Error('User not found.');
          error.status = 401;
          reject(error);
        }
        bcrypt.compare(password, user.password, (cryptError) => {
          if (cryptError) return reject(cryptError);
          resolve(user);
        });
      });
  });
};

export default mongoose.model('User', UserSchema);
