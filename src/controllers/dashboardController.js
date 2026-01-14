const { Op } = require('sequelize');
const { getModels } = require('../utils/db');

async function summary(req, res, next) {
  try {
    const { User, Order, Inquiry } = getModels();

    const subscribers = await User.count({ where: { role: 'customer' } });
    const orders = await Order.count();
    const inquiries = await Inquiry.count({ where: { status: { [Op.ne]: 'closed' } } });

    const revenueRows = await Order.findAll({
      where: { status: { [Op.in]: ['paid', 'shipped'] } },
      attributes: [[Order.sequelize.fn('SUM', Order.sequelize.col('total')), 'sum']]
    });

    const revenue = Number(revenueRows?.[0]?.get('sum') || 0);

    return res.json({ subscribers, orders, inquiries, revenue });
  } catch (err) {
    return next(err);
  }
}

module.exports = { summary };
