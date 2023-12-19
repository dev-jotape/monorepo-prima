import { database } from '@boilerplate-node/core';
import { Request, NextFunction } from 'express';

export const cacheIntervals = {
    twoMinutes: 120,
    fiveMinutes: 300,
    tenMinutes: 600,
    halfHour: 1800,
    oneHour: 3600,
    twelveHours: 43200,
    oneDay: 86400
};

export const cache = (duration: number) =>
    // "res" needs to not have any type, otherwise, typescript will fail
    async (req: Request, res: any, next: NextFunction) => {
        try {
            const key = '__express__' + (req.originalUrl || req.url);
            const cachedBody = await database.redis.get(key);
            if (cachedBody) {
                res.send(JSON.parse(cachedBody));
            } else {
                res.sendResponse = res.send;
                res.send = (body: any) => {
                    // Only cache if the response is 200
                    if (res.statusCode === 200) {
                        database.redis.set(key, JSON.stringify(body), 'EX', duration);
                    }
                    res.sendResponse(body);
                };
                next();
            }
        } catch (error) {
            console.error('Redis error: ', error);
            next();
        }
    };