import Redis from 'ioredis';

const getRedisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis: Connecting...');
        return new Redis(process.env.REDIS_URL);
    }
    console.log('Redis: URL not found, using null client (caching disabled)');
    return null;
};

// Global instance to prevent multiple connections in serverless environment
const globalForRedis = global as unknown as { redis: Redis | null };

export const redis = globalForRedis.redis || getRedisClient();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
