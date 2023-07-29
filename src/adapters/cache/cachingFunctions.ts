import type { BlogPost } from '../../domain/models/BlogPost';
import redisCache from './redisCache';

const CACHE_DURATION_SECONDS = 86400; // 24 Hours

async function getFromCache(key: string): Promise<BlogPost | BlogPost[] | null> {
  try {
    const result = await redisCache.get(key);

    if (result) {
      return JSON.parse(result);
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  };
};

async function cache(key: string, data: BlogPost | BlogPost[]): Promise<void> {
  try {
    await redisCache.setEx(key, CACHE_DURATION_SECONDS, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  };
};

/*
async function getPostFromCacheById(id: string): Promise<BlogPost | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await redisCache.get(id);

      const cachedPost = result ? JSON.parse(result) : null;
      resolve(cachedPost);
      
    } catch (error) {
      console.log(error);
      reject(error);
      return null;
    }
  });
};

async function cachePostUsingId(id: string, post: BlogPost): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const CACHE_DURATIONS_SECONDS = 86400; // 24 Hours

    try {
      await redisCache.setEx(id, CACHE_DURATIONS_SECONDS, JSON.stringify(post));
      resolve();
    } catch(error) {
      console.log(error);
      reject(error);
    };
  });
};
*/


export { getFromCache, cache };
