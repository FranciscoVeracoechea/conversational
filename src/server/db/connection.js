import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${host}:${port}/${db}`, {
  useNewUrlParser: true,
  user,
  pass,
  useCreateIndex: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.info('Database connection susccess!');
});

export default mongoose.connection;
