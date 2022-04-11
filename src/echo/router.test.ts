import request from 'supertest';
import {StatusCodes} from 'http-status-codes';

import app from '../app';
import mongoose from 'mongoose';

describe('GET /echo', ()=>{
  it('should return 200 hello for unprotected route', async ()=>{
    const result = await request(app.callback())
        .get('/unprotected-echo');

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.text).toBe('hello');
  });
  it('should return 400 authentication error for protected route', async ()=>{
    const result = await request(app.callback())
        .get('/protected-echo');

    expect(result.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.text).toBe('Authentication Error');
  });
  it('should connect to mongodb', async ()=>{
    const uri = process.env.MONGO_URI?process.env.MONGO_URI:'';
    await mongoose.connect(uri);

    expect(mongoose.connection.readyState).toBe(1);
    await mongoose.disconnect();
  });
});
