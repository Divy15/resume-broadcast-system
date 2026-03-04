// redis.js
const { Redis } = require('ioredis');
const config = require('config');

const redis = new Redis({
  host: config.get("APP.REDIS.HOST"),
  port: config.get("APP.REDIS.PORT"),
  maxRetriesPerRequest: null,
});

module.exports = redis;