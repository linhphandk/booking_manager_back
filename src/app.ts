import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import jwt from 'koa-jwt';

import {
  unprotectedRouter as unprotectedEchoRouter,
  protectedRouter as protectedEchoRouter,
} from './echo/router';

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw Error('jwt secret not defined');
};

const app = new Koa();

app.use(bodyParser({}));

app.use(unprotectedEchoRouter.routes());

app.use(jwt({secret: 'shared-secret'}));

app.use(protectedEchoRouter.routes());

export default app;
