export const AddressModel = (connection, DataTypes) => {
  return connection.define('Address', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    clientId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'client_id',
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    nomecature: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    detail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  })
}

