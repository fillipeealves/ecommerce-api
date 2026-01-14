const { getModels } = require('../utils/db');
const { hashPassword, comparePassword, signToken } = require('../utils/auth');

async function register(req, res, next) {
  try {
    const { User } = getModels();
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'E-mail já cadastrado.' });

    const password_hash = await hashPassword(password);
    const user = await User.create({ name, email, password_hash, role: 'customer' });

    const token = signToken(user);
    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { User } = getModels();
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas.' });

    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas.' });

    const token = signToken(user);
    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login };
