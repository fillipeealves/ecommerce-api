const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(180), allowNull: false },
      sku: { type: DataTypes.STRING(64), allowNull: false, unique: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      purchases: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      dateAdded: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    },
    {
      tableName: 'products'
    }
  );

  return Product;
};
