import { Sequelize } from 'sequelize';

export const OrderDateModel = (connection, DataTypes) => {
  return connection.define('OrderDate', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    clientId: {
      field: 'client_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    dateOrder: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },
  })
}
