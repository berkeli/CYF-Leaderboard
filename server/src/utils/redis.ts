const redis = require('redis').createClient({
    url: process.env.REDIS_URL
});

redis.on('error', (err:Error) => console.log('Redis Client Error', err));

export default redis;