import Router from '@koa/router';
import {StatusCodes} from 'http-status-codes';
import {Manager} from './models';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw Error('jwt secret not defined');
};
export const unprotectedRouter = new Router();

unprotectedRouter.post('/', async (ctx)=>{
  const {username, password} = ctx.request.body;
  const newManager = new Manager({
    username,
    password,
  });

  const errors = newManager.validateSync();
  if (errors) {
    ctx.status = StatusCodes.UNPROCESSABLE_ENTITY;
    ctx.body = errors;
    return;
  }

  await newManager.save().then((res)=>{
    const responseBody = {
      _id: res._id,
      username: res.username,
    };
    const token = jwt.sign(responseBody, SECRET);
    ctx.cookies.set('Authorization', 'Bearer '+ token);
    ctx.body = {
      _id: res._id,
      username: res.username,
    };
    ctx.status = StatusCodes.CREATED;
  });
});
