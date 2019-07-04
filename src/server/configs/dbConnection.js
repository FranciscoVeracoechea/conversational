import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  user: DB_USERNAME,
  pass: DB_PASSWORD,
  useCreateIndex: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.info('Database connection susccess!');
});

export default mongoose.connection;
