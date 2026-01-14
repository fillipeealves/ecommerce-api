const { Op } = require('sequelize');
const { getModels } = require('../utils/db');

async function list(req, res, next) {
  try {
    const { Product } = getModels();
    const { search = '', limit = 10, offset = 0 } = req.query;

    const where = search
      ? {
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { sku: { [Op.like]: `%${search}%` } }]
        }
      : undefined;

    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [['dateAdded', 'DESC']],
      limit: Number(limit),
      offset: Number(offset)
    });

    return res.json({ count, limit: Number(limit), offset: Number(offset), rows });
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { Product } = getModels();
    const created = await Product.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'SKU já existe.' });
    }
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { Product } = getModels();
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.json(product);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { Product } = getModels();
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    await product.update(req.body);
    return res.json(product);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'SKU já existe.' });
    }
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { Product } = getModels();
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    await product.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, create, getById, update, remove };
