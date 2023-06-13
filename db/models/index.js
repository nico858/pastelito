import { Sequelize } from 'sequelize';

import connection from "../database.js";
import { AddressModel } from "./address.model.js";
import { CategoryModel } from "./category.model.js";
import { OrderDateModel } from "./orderDate.model.js";
import { OrderDetailModel } from "./orderDetail.model.js";
import { ProductModel } from "./product.model.js";
import { UserModel } from "./user.model.js";


export const Address = AddressModel(connection, Sequelize);
export const OrderDate = OrderDateModel(connection, Sequelize);
export const OrderDetail = OrderDetailModel(connection, Sequelize);
export const Product = ProductModel(connection, Sequelize);
export const User = UserModel(connection, Sequelize);


User.hasOne(Address, { as: 'address', foreignKey: 'userId' });
Address.hasOne(User, { as: 'user', foreignKey: 'addressId' });

User.hasMany(OrderDate, { as: 'orders', foreignKey: 'userId' });
OrderDate.belongsTo(User, {  as: 'user', foreignKey: 'orderDateId' });

OrderDate.belongsToMany(OrderDetail, { as: 'items', through: OrderDetail, foreignKey: 'orderDateId', otherKey: 'productId' });
OrderDetail.belongsTo(OrderDate, { foreignKey: 'orderDetailId' });

Product.belongsToMany(OrderDate, { through: OrderDetail });
OrderDetail.belongsTo(Product, { as: 'item', foreignKey: 'orderDateId' });


connection.sync({ alter: true });


