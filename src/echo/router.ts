import Router from '@koa/router';

import echoRouter from './controller';

export const unprotectedRouter = new Router();
unprotectedRouter.use('/unprotected-echo', echoRouter.routes());


export const protectedRouter = new Router();
protectedRouter.use('/protected-echo', echoRouter.routes());
