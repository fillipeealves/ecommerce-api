const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
      unitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    },
    {
      tableName: 'order_items'
    }
  );

  return OrderItem;
};
