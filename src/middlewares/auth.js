const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Token ausente (Authorization).' });

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ message: 'Formato do token inválido. Use: Bearer <token>' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Não autenticado.' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Sem permissão.' });
    return next();
  };
}

module.exports = { authRequired, requireRole };
