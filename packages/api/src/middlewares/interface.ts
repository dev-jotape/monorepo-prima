import * as core from 'express-serve-static-core';
import { Request } from 'express';

export interface RequestWithUser<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>
    extends Request<P, ResBody, ReqBody, ReqQuery> {
    userId?: number;
}