/**
 * Module to store and get tokens from services. Uses the serviceToken model to interact with
 * the associated database table.
 *
 * @author Marcos Duarte <marcos.duarte@smark.io>
 */

// Modules
const db = require('./database/db');

const { Op } = db.Sequelize;

// Model
const { ServiceToken } = db;

/**
 * Store a token with an optional expiration date.
 *
 * @param {string} token
 * @param {Date} expirationDate
 * @param {string} client
 * @param {string} service
 */
module.exports.storeToken = async function storeToken(
  token, expirationDate = null, client = process.env.client, service = process.env.service,
) {
  return ServiceToken.create({
    client,
    service,
    token,
    expirationDate,
  });
};

/**
 * Returns the most recent valid token of a service. If the parameter checkExpirationDate is
 * set to false, it will return the last token of the service, ignoring the expiration date.
 *
 * @param {boolean} checkExpirationDate
 * @param {string} client
 * @param {string} service
 */
module.exports.getToken = async function getToken(
  checkExpirationDate = true, client = process.env.client, service = process.env.service,
) {
  const whereClause = {
    client,
    service,
  };

  if (checkExpirationDate) {
    whereClause.expirationDate = {
      [Op.or]: {
        [Op.eq]: null,
        [Op.gte]: new Date(),
      },
    };
  }

  return ServiceToken.findAll({
    where: whereClause,
    order: db.sequelize.literal('id DESC'),
    limit: 1,
  });
};
