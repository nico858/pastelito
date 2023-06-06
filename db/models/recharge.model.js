import { Sequelize } from 'sequelize';

export const RechargeModel = (connection, DataTypes) => {
  return connection.define('Recharge', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'recharge_id'
    },
    clientId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'client_id',
      unique: false,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    cash: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    dateRecharge: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'date_recharge',
      defaultValue: Sequelize.NOW
    }
  })
}
