import redis from 'redis';

const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(redisPort);


class RedisClient {
    public client = null;

    constructor(private redis?) {
        if(!this.redis) {
            this.client = redisClient;
        }else {
            this.client = redis;
        }
    }

    public getItems = (key:string) => {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if(err) {resolve(null)}
                resolve(data);
            })
        })
    }

    public saveItems = (key: string, data: any, expiration = 600): Promise<void> => {
        return new Promise((resolve, reject) => {
            this.client.setex(key,expiration, JSON.stringify(data))
            resolve();
        })
    }
}

export default new RedisClient();
