const Sequelize = require('sequelize');
const logger = require('../logger');

const dbConnection = new Sequelize(
  process.env.dbSchema,
  process.env.dbUser,
  process.env.dbPassword,
  {
    dialect: process.env.dbDialect,
    host: process.env.dbHost,
    port: +process.env.dbPort,
    operatorsAliases: false,
    timezone: process.env.dbTimezone,
    logging: false,
  },
);

async function checkConnection() {
  try {
    await dbConnection.authenticate();
  } catch (err) {
    logger.error(`Erro ao conectar com o BD.\n ${err}`);
  }
}

async function closeConnection() {
  try {
    await dbConnection.close();
  } catch (err) {
    logger.error(`Não foi possível encerrar a conexão com o BD.\nErro: ${err}`);
  }
}

module.exports = {
  Sequelize,
  dbConnection,
  UserToken: require('./models/userToken')(dbConnection, Sequelize),
  Log: require('./models/log')(dbConnection, Sequelize),
  closeConnection,
  checkConnection,
};
