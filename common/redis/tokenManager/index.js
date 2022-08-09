/**
 * Module to easy handle tokens between client services without conflict.
 * @author Will Saymon <willian.silva@smarkio.com.br>
 */

const { promisify } = require('util')
const redisClient = require('..')

const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)
const delAsync = promisify(redisClient.del).bind(redisClient)
const quitAsync = promisify(redisClient.quit).bind(redisClient)

const KEY = `${process.env.client}-${process.env.stage}`

/**
 * Get stored data with the given key
 * @param {string} key A key for the storage toke/data
 * @returns {Promise<string|null>} A promise which will return the string token
 */
const getToken = key => getAsync(`${KEY}-${key}`)

/**
 * Set token or data on redis cache for the given amount of time
 * @param {string} key A string for index the token
 * @param {string} token the data for cache
 * @param {number} expiration the amount of time in seconds to keep data on cache
 * @returns {Promise<string|null>}
 */
const setToken = (key, token, expiration = 60 * 60 * 24) =>
  setAsync(`${KEY}-${key}`, token, 'EX', expiration)

/**
 * @callback authenticationFunction
 * @returns {Promise<string>}
 */

/**
 * Try to get the token on the given key or run a async function
 * to get data and set.
 * @param {string} key A string for index the token
 * @param {number} expiration A amount of time in seconds to keep data on cache
 * @param {authenticationFunction} authenticate A function that will be called if token was expired
 * @returns {Promise<string>} A promise which will return the string token
 */
const getTokenOrAuthenticate = async (
  key,
  expiration,
  authenticate,
  expiredToken = false
) => {
  let token
  if (expiredToken) {
    token = await authenticate()
    await setToken(key, token, expiration)
  } else {
    token = await getToken(key)
    if (!token) {
      token = await authenticate()
      await setToken(key, token, expiration)
    }
  }
  return token
}

/**
 * Try to delete a key from redis cache.
 * @param {string} key A key for the storaged token/data
 * @returns {Promise<number|null>} A promise which will return how many keys were deleted
 */
const delToken = (key) => delAsync(`${KEY}-${key}`);

const quitConnection = () => quitAsync()

module.exports = {
  getToken,
  setToken,
  getTokenOrAuthenticate,
  delToken,
  quitConnection
}
