import Redis from 'ioredis';
import logger from './logger';

const getRedisClient = () => {
    if (process.env.REDIS_URL) {
        logger.info('Redis: Connecting...');
        return new Redis(process.env.REDIS_URL);
    }
    logger.warn('Redis: URL not found, using null client (caching disabled)');
    return null;
};

// Global instance to prevent multiple connections in serverless environment
const globalForRedis = global as unknown as { redis: Redis | null };

export const redis = globalForRedis.redis || getRedisClient();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
