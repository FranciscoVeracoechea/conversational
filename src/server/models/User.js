import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import { ImageSchema } from './Image';


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
  created: { type: Date, default: Date.now },
  description: {
    type: String,
  },
  images: {
    type: [ImageSchema],
    default: [],
  },
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return crypto.createHmac('sha512', this.salt).update(password).digest('hex');
  // return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha1');
};

UserSchema.virtual('userId')
  .get(function getUserId() {
    return this.id;
  });

// UserSchema.virtual('password')
//   .set(function setPassword(password) {
//     this.plainPassword = password;
//     this.salt = crypto.randomBytes(32).toString('hex');
//     // more secure - this.salt = crypto.randomBytes(128).toString('hex');
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function getpassworrd() { return this.plainPassword; });

UserSchema.methods.checkPassword = function checkPassword(password) {
  return this.encryptPassword(password) === this.password;
};

UserSchema.pre('save', function presave(next) {
  this.salt = crypto.randomBytes(128).toString('hex');
  this.password = this.encryptPassword(this.password);
  next();
});

// UserSchema.pre('save', function presave(next) {
//   const user = this;
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, null, (error, hash) => {
//       if (error) return next(error);
//       user.password = hash;
//       next();
//     });
//   });
// });

UserSchema.statics.authenticate = function authenticate(email, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ email })
      .exec((err, user) => {
        if (err) return reject(err);
        if (!user) {
          const error = new Error('User not found.');
          error.status = 401;
          return reject(error);
        }
        if (user.checkPassword(password)) {
          return resolve(user);
        }
        const error = new Error('Invalid credentials.');
        error.status = 401;
        return reject(error);
      });
  });
};

export default mongoose.model('User', UserSchema);
