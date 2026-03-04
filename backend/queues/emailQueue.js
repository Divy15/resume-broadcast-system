// queues/emailQueue.js
const { Queue } = require('bullmq');
const redis = require('../redis');

const emailQueue = new Queue('bulk-email', {
  connection: redis
});

module.exports = emailQueue;