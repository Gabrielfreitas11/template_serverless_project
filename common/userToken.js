/**
 * Module to store and get tokens from services. Uses the UserToken model to interact with
 * the associated database table.
 *
 * @author Everton Victor <everton.junior@smark.io>
 */

// Modules
const db = require('./database/db');

const { Op } = db.Sequelize;

// Model
const { UserToken } = db;

/**
 * Store a token with an optional expiration date.
 *
 * @param {string} token
 * @param {Date} expirationDate
 * @param {string} client
 * @param {string} service
 */
async function storeToken(
  token,
  userId,
  expirationDate = null,
  service = null,
  client = process.env.client,
) {
  return UserToken.create({
    client,
    service,
    userId,
    token,
    expirationDate,
  });
}

/**
 * Returns the most recent valid token of a service. If the parameter checkExpirationDate is
 * set to false, it will return the last token of the service, ignoring the expiration date.
 *
 * @param {boolean} checkExpirationDate
 * @param {string} client
 * @param {string} service
 */
async function getToken(
  userId,
  token,
  service = null,
  checkExpirationDate = true,
  client = process.env.client,
) {
  const whereClause = {
    client,
    service,
    userId,
    token,
  };

  if (checkExpirationDate) {
    whereClause.expirationDate = {
      [Op.or]: {
        [Op.eq]: null,
        [Op.gte]: new Date(),
      },
    };
  }

  return UserToken.findAll({
    where: whereClause,
    order: db.sequelize.literal('id DESC'),
    limit: 1,
  });
}

module.exports = { getToken, storeToken };
