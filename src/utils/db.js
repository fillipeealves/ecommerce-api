const { initModels } = require('../models');

let cached;

function getModels() {
  if (!cached) cached = initModels();
  return cached;
}

async function syncDatabase() {
  const { sequelize } = getModels();
  await sequelize.authenticate();
  // Em ambiente de estudo, usamos sync. Em produção, prefira migrations.
  await sequelize.sync({ alter: true });
}

module.exports = { getModels, syncDatabase };
