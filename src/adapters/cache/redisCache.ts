import * as redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

(async () => {
  redisClient.on("error", (error: Error) => {
    console.log(error);
    return;
  });

  await redisClient.connect();
})();

export default redisClient;
