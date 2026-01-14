const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: 'USD' }
    },
    {
      tableName: 'orders'
    }
  );

  return Order;
};
