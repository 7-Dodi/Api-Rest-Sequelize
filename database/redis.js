const redis = require('redis');
let client = redis.createClient();

async function connectRedis (){
    client.connect();
    client.on('error', err=>{
        console.log('Error: '+err);
    });
    console.log('Connect with the Redis');
}

connectRedis();

module.exports = client;