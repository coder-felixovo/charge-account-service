import { Redis } from 'ioredis'

/*
  注意：要先启动redis server
*/

const redis: Redis = Redis.createClient()

console.log('Redis is running at http://127.0.0.1:6379')

export default redis

