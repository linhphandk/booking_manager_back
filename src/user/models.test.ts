import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import {Customer, Manager} from './models';

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
  it('should add a manager with valid hashed password', async ()=>{
    const newManager = new Manager({
      username: 'peterp',
      password: 'griffi',
    });
    await newManager.save();
    expect(await Manager.count()).toBe(1);
    await bcrypt.compare('griffi', newManager.password, (err, same)=>{
      expect(same).toBeTruthy();
    });
  });

  it('should add a customer with valid hashed password', async ()=>{
    const newCustomer = new Customer({
      username: 'peterp',
      password: 'griffi',
    });
    await newCustomer.save();
    expect(await Customer.count()).toBe(1);
    await bcrypt.compare('griffi', newCustomer.password, (err, same)=>{
      expect(same).toBeTruthy();
    });
  });

  it('should throw username shorter than 6 chars', async ()=>{
    // eslint-disable-next-line max-len
    const errorMessage = 'Customer validation failed: username: Path `username` (`peter`) is shorter than the minimum allowed length (6).';
    const newCustomer = new Customer({
      username: 'peter',
      password: 'griffin',
    });
    const error = newCustomer.validateSync();
    expect(error?.message).toEqual(errorMessage);
  });

  it('should throw password shorter than 6 chars', async ()=>{
    // eslint-disable-next-line max-len
    const errorMessage = 'Customer validation failed: password: Path `password` (`griff`) is shorter than the minimum allowed length (6).';
    const newCustomer = new Customer({
      username: 'petere',
      password: 'griff',
    });
    const error = newCustomer.validateSync();
    expect(error?.message).toEqual(errorMessage);
  });

  it('should throw duplicate username', async ()=>{
    const newCustomer = new Customer({
      username: 'petere',
      password: 'griffin',
    });
    const newCustomer2 = new Customer({
      username: 'petere',
      password: 'griffin',
    });
    await newCustomer.save();
    await newCustomer2.save().catch((err)=>{
      expect(err.code).toEqual(11000);
    });
  });
});
