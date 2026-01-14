const { Sequelize } = require('sequelize');

let sequelizeInstance;

function getSequelize() {
  if (sequelizeInstance) return sequelizeInstance;

  const {
    DB_HOST = 'localhost',
    DB_PORT = '3306',
    DB_NAME = 'ecommerce_api',
    DB_USER = 'root',
    DB_PASS = '',
    NODE_ENV = 'development'
  } = process.env;

  const logging = false;

  sequelizeInstance = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql',
    logging,
    define: {
      underscored: true,
      timestamps: true
    },
    timezone: '+00:00'
  });

  return sequelizeInstance;
}

module.exports = { getSequelize };
