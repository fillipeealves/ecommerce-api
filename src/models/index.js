const { getSequelize } = require('../config/database');

const defineUser = require('./User');
const defineProduct = require('./Product');
const defineOrder = require('./Order');
const defineOrderItem = require('./OrderItem');
const defineInquiry = require('./Inquiry');

function initModels() {
  const sequelize = getSequelize();

  const User = defineUser(sequelize);
  const Product = defineProduct(sequelize);
  const Order = defineOrder(sequelize);
  const OrderItem = defineOrderItem(sequelize);
  const Inquiry = defineInquiry(sequelize);

  // Associations
  User.hasMany(Order, { foreignKey: { name: 'user_id', allowNull: false } });
  Order.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });

  Order.hasMany(OrderItem, { foreignKey: { name: 'order_id', allowNull: false }, onDelete: 'CASCADE' });
  OrderItem.belongsTo(Order, { foreignKey: { name: 'order_id', allowNull: false } });

  Product.hasMany(OrderItem, { foreignKey: { name: 'product_id', allowNull: false } });
  OrderItem.belongsTo(Product, { foreignKey: { name: 'product_id', allowNull: false } });

  User.hasMany(Inquiry, { foreignKey: { name: 'user_id', allowNull: false } });
  Inquiry.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });

  return { sequelize, User, Product, Order, OrderItem, Inquiry };
}

module.exports = { initModels };
