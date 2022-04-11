import app from './app';
import mongoose from 'mongoose';

const PORT = 8000;
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
} = process.env;

if (
  !(MONGO_USERNAME&&
    MONGO_PASSWORD&&
    MONGO_HOST&&
    MONGO_PORT)
) {
  throw Error('mongo env variable not defined');
}

mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`);

app.listen(PORT, ()=>{
  console.log('listening on '+PORT);
});
