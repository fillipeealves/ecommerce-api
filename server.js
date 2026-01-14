require('dotenv').config();

const app = require('./src/app');
const { syncDatabase } = require('./src/utils/db');

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

(async () => {
  try {
    await syncDatabase();
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Falha ao iniciar:', err);
    process.exit(1);
  }
})();
