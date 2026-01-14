const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Inquiry = sequelize.define(
    'Inquiry',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      subject: { type: DataTypes.STRING(160), allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM('open', 'in_progress', 'closed'),
        allowNull: false,
        defaultValue: 'open'
      }
    },
    {
      tableName: 'inquiries'
    }
  );

  return Inquiry;
};
