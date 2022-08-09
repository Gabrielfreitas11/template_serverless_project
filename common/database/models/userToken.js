/**
 * Service Token model. The purpose of this model is to store tokens from APIs that has
 *  a requirement of generating tokens that expires. (ex: Credz)
 *
 * @param {object} sequelize
 * @param {object} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
  const UserToken = sequelize.define('user_tokens', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    client: Sequelize.STRING(50),
    service: Sequelize.STRING(50),
    userId: { type: Sequelize.STRING(255), field: 'user_id' },
    token: Sequelize.STRING(255),
    expirationDate: { type: Sequelize.DATE, field: 'expiration_date' },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  });

  return UserToken;
};
