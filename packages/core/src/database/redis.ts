import Redis from 'ioredis';
import config from '../config';

const redis = new Redis(config.redis!);

export { redis }