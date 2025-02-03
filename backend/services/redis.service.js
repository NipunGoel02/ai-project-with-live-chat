import Redis from 'ioredis';
const redisClient = new Redis({
    host: 'redis-16606.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 16606,
    password: 'zwZ22n0S8n4S4y4WToDY9s5dGBRrZ00G',
}) 


redisClient.on('connection', () => {
    console.log('Connected to Redis');
})

export default redisClient;