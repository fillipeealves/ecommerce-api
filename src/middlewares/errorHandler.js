// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  return res.status(status).json({ message });
}

module.exports = { errorHandler };
