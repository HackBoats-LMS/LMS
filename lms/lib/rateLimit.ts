import redis from './redis';

export interface RateLimitOptions {
  interval: number; // in milliseconds
  uniqueTokenPerInterval?: number; // legacy from lru-cache based implementation
}

/**
 * A simple Redis-based rate limiter for Next.js API routes.
 */
export function rateLimit(options: RateLimitOptions) {
  return {
    /**
     * Checks if the rate limit has been exceeded for a given token.
     * @param limit The maximum number of allowed requests in the interval.
     * @param token A unique identifier for the client (e.g., an IP address).
     */
    check: async (limit: number, token: string) => {
      if (!redis) {
        console.error(`[RATELIMITER] Rate limit service unavailable - Redis not configured.`);
        throw new Error('Rate limit service unavailable');
      }
      
      const key = `ratelimit:${token}`;
      try {
        const currentUsage = await redis.incr(key);
        if (currentUsage === 1) {
          await redis.expire(key, Math.ceil(options.interval / 1000));
        }

        if (currentUsage > limit) {
          throw new Error('Rate limit exceeded');
        }
      } catch (e: any) {
        if (e.message === 'Rate limit exceeded') {
          throw e; 
        }
        console.error('[RATELIMITER] Rate limit service unavailable:', e);
        // Fail closed for security - block requests if limiter is unavailable
        throw new Error('Rate limit service unavailable');
      }
    }
  };
}
