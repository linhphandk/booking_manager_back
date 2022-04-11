import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

export = async function globalSetup() {
  require('dotenv').config();
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri;


  await mongoose.connect(uri, { });
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
