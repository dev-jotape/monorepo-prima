import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    env: process.env.ENV,
    redis: process.env.REDIS_URL,
    jwtSecret: process.env.JWT_SECRET,
    defaultSkip: 0,
    defaultTake: 10,
    queueUrl: process.env.SQS_URL,
    awsRegion: process.env.AWS_REGION
}