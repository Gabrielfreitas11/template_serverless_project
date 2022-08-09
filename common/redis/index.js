const redis = require('redis')
const client = redis.createClient({
  host: process.env.rdHost,
  port: process.env.rdPort,
  password: process.env.rdPassword
})

client.on('error', (error) => {
  console.error(error)
})

module.exports = client
