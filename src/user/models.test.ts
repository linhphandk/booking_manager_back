import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import {Customer, Manager} from './models';

describe('GET /echo', ()=>{
  beforeAll(async ()=>{
    const uri = process.env.MONGO_URI?process.env.MONGO_URI:'';
    await mongoose.connect(uri);
  });

  afterAll(async ()=>{
    await mongoose.disconnect();
  });
  it('should add a manager with valid hashed password', async ()=>{
    const newManager = new Manager({
      username: 'peter',
      password: 'griffin',
    });
    await newManager.save();
    expect(await Manager.count()).toBe(1);
    await bcrypt.compare('griffin', newManager.password, (err, same)=>{
      expect(same).toBeTruthy();
    });
  });

  it('should add a customer with valid hashed password', async ()=>{
    const newCustomer = new Customer({
      username: 'peter',
      password: 'griffin',
    });
    await newCustomer.save();
    expect(await Manager.count()).toBe(1);
    await bcrypt.compare('griffin', newCustomer.password, (err, same)=>{
      expect(same).toBeTruthy();
    });
  });
});
