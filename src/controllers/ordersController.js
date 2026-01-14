const { Op } = require('sequelize');
const { getModels } = require('../utils/db');

async function list(req, res, next) {
  try {
    const { Order, OrderItem, Product } = getModels();
    const { limit = 10, offset = 0, userId } = req.query;

    const where = {};
    if (req.user.role !== 'admin') {
      where.user_id = req.user.id;
    } else if (userId) {
      where.user_id = Number(userId);
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [{ model: OrderItem, include: [Product] }],
      order: [['createdAt', 'DESC']],
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
    const { Order, OrderItem, Product, User, sequelize } = getModels();
    const { userId, status, currency, items } = req.body;

    // Se não for admin, só pode criar pedido para si.
    if (req.user.role !== 'admin' && Number(req.user.id) !== Number(userId)) {
      return res.status(403).json({ message: 'Sem permissão para criar pedido para outro usuário.' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const productIds = items.map(i => i.productId);
    const products = await Product.findAll({ where: { id: { [Op.in]: productIds } } });
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Um ou mais produtos não existem.' });
    }

    const byId = new Map(products.map(p => [Number(p.id), p]));

    const result = await sequelize.transaction(async (t) => {
      const order = await Order.create(
        { user_id: userId, status, currency, total: 0 },
        { transaction: t }
      );

      let total = 0;
      for (const it of items) {
        const product = byId.get(Number(it.productId));
        const unitPrice = Number(product.price);
        total += unitPrice * Number(it.quantity);

        await OrderItem.create(
          {
            order_id: order.id,
            product_id: product.id,
            quantity: it.quantity,
            unitPrice
          },
          { transaction: t }
        );

        // Atualiza contagem de purchases (simples)
        await product.update({ purchases: Number(product.purchases) + Number(it.quantity) }, { transaction: t });
      }

      await order.update({ total }, { transaction: t });

      const created = await Order.findByPk(order.id, {
        include: [{ model: OrderItem, include: [Product] }],
        transaction: t
      });

      return created;
    });

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { Order, OrderItem, Product } = getModels();
    const order = await Order.findByPk(req.params.id, { include: [{ model: OrderItem, include: [Product] }] });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    if (req.user.role !== 'admin' && Number(order.user_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Sem permissão.' });
    }

    return res.json(order);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { Order } = getModels();
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    // Por simplicidade: apenas admin pode atualizar status
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Sem permissão.' });

    await order.update(req.body);
    return res.json(order);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { Order } = getModels();
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Sem permissão.' });

    await order.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, create, getById, update, remove };
