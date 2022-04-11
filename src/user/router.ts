import Router from '@koa/router';
import {unprotectedRouter} from './controller';
export const unprotectedManagerRouter = new Router();
unprotectedManagerRouter.use(
    '/user/manager',
    unprotectedRouter.routes(),
);
