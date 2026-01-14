const { getModels } = require('../utils/db');
const { hashPassword } = require('../utils/auth');

function canAccess(req, userId) {
  return req.user.role === 'admin' || Number(req.user.id) === Number(userId);
}

async function list(req, res, next) {
  try {
    const { User } = getModels();
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] });
    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { User } = getModels();
    const { id } = req.params;
    if (!canAccess(req, id)) return res.status(403).json({ message: 'Sem permissão.' });

    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { User } = getModels();
    const { id } = req.params;
    if (!canAccess(req, id)) return res.status(403).json({ message: 'Sem permissão.' });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const patch = { ...req.body };
    if (patch.password) {
      patch.password_hash = await hashPassword(patch.password);
      delete patch.password;
    }

    await user.update(patch);
    return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { User } = getModels();
    const { id } = req.params;
    if (!canAccess(req, id)) return res.status(403).json({ message: 'Sem permissão.' });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    await user.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, getById, update, remove };
