const redis = require('redis').createClient({
    url: process.env.REDIS_URL
});

export default redis;