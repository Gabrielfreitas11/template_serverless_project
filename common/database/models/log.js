module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define('log', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    level: Sequelize.STRING(10),
    client: Sequelize.STRING(50),
    service: Sequelize.STRING(50),
    payload: Sequelize.JSON,
    duration: Sequelize.DOUBLE,
    ipAddress: { type: Sequelize.STRING(20), field: 'ip_address' },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  });

  return schema;
};
