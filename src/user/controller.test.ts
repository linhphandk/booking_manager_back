import mongoose from 'mongoose';
import request from 'supertest';
import {Customer, Manager} from './models';
import {StatusCodes} from 'http-status-codes';
import app from '../app';

describe('User models', ()=>{
  beforeAll(async ()=>{
    const uri = process.env.MONGO_URI?process.env.MONGO_URI:'';
    await mongoose.connect(uri);
  });

  afterEach(async ()=>{
    await Manager.deleteMany({});
    await Customer.deleteMany({});
  });

  afterAll(async ()=>{
    await mongoose.disconnect();
  });
  it('should respond with 201 and manager object', async ()=>{
    const newManager = {
      username: 'peterp',
      password: 'griffi',
    };
    await request(app.callback())
        .post('/user/manager/')
        .send(newManager)
        .expect(StatusCodes.CREATED)
        .then((res)=>{
          expect(res.body._id).toBeDefined();
          expect(res.body.username).toBe(newManager.username);
          expect(res.body.password).not.toBeDefined();
        });
  });
});
