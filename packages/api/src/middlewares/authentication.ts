import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '@boilerplate-node/core';
import { RequestWithUser } from './interface';

export function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction): void {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || token === undefined) {
        if ((req as any).authTokenIsOptional) {
            next();
            return;
        }
        res.sendStatus(401); // if there isn't any token
        return;
    }

    verify(token, config.jwtSecret!, async (err, user) => {
        // prevent error when token is not valid and _user undefined or string
        if (err || user === undefined) {
            res.sendStatus(403);
            return;
        }

        if (!user['userId']) {
            res.sendStatus(403);
            return;
        }

        req.userId = user['userId'];
        next(); // pass the execution off to whatever request the client intended
    });
}