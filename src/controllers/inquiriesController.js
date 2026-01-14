const { getModels } = require('../utils/db');

async function list(req, res, next) {
  try {
    const { Inquiry, User } = getModels();
    const where = {};
    if (req.user.role !== 'admin') where.user_id = req.user.id;

    const inquiries = await Inquiry.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });

    return res.json(inquiries);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { Inquiry, User } = getModels();
    const { userId } = req.body;

    if (req.user.role !== 'admin' && Number(req.user.id) !== Number(userId)) {
      return res.status(403).json({ message: 'Sem permissão para criar inquiry para outro usuário.' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const created = await Inquiry.create({
      user_id: userId,
      subject: req.body.subject,
      message: req.body.message,
      status: req.body.status
    });

    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { Inquiry, User } = getModels();
    const inquiry = await Inquiry.findByPk(req.params.id, { include: [{ model: User, attributes: ['id', 'name', 'email'] }] });
    if (!inquiry) return res.status(404).json({ message: 'Inquiry não encontrada.' });

    if (req.user.role !== 'admin' && Number(inquiry.user_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Sem permissão.' });
    }

    return res.json(inquiry);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { Inquiry } = getModels();
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry não encontrada.' });

    // Admin pode atualizar qualquer; cliente só a própria e sem status closed?
    if (req.user.role !== 'admin' && Number(inquiry.user_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Sem permissão.' });
    }

    // Se não for admin, não deixa mudar status para closed diretamente
    if (req.user.role !== 'admin' && req.body.status === 'closed') {
      return res.status(403).json({ message: 'Apenas admin pode fechar inquiry.' });
    }

    await inquiry.update(req.body);
    return res.json(inquiry);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { Inquiry } = getModels();
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry não encontrada.' });

    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Sem permissão.' });

    await inquiry.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, create, getById, update, remove };
