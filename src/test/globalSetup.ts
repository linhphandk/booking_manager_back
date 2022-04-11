import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
require('dotenv').config();

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri;


  await mongoose.connect(uri, { });
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
