export const UserModel = (connection, DataTypes) => {
  return connection.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    userPassword: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    addressId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'address_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'
    },
    siuuPoints: {
      field: 'siuu_points',
      allowNull: true,
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    recoveryToken: {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING
    }
  })
}
