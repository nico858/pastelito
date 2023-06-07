import { Sequelize } from 'sequelize';

import connection from "../database.js";
import { AddressModel } from "./address.model.js";
import { CategoryModel } from "./category.model.js";
import { OrderDateModel } from "./orderDate.model.js";
import { OrderDetailModel } from "./orderDetail.model.js";
import { ProductModel } from "./product.model.js";
import { RechargeModel } from "./recharge.model.js";
import { UserModel } from "./user.model.js";


export const Address = AddressModel(connection, Sequelize);
export const Category = CategoryModel(connection, Sequelize);
export const OrderDate = OrderDateModel(connection, Sequelize);
export const OrderDetail = OrderDetailModel(connection, Sequelize);
export const Product = ProductModel(connection, Sequelize);
export const Recharge = RechargeModel(connection, Sequelize);
export const User = UserModel(connection, Sequelize);


User.hasOne(Address, { as: 'address', foreignKey: 'id' });
Address.hasOne(User, { as: 'users', foreignKey: 'userId' });

User.hasMany(OrderDate, { as: 'orderDates', foreignKey: 'id' });
OrderDate.belongsTo(User, { as: 'users', foreignKey: 'userId' });

User.hasMany(Recharge, { as: 'recharges', foreignKey: 'id' });
Recharge.belongsTo(User, { as: 'users', foreignKey: 'userId' });

Category.hasMany(Product, { as: 'products', foreignKey: 'id' });
Product.belongsTo(Category, { as: 'categories', foreignKey: 'categoryId' });

OrderDate.belongsToMany(OrderDetail, { through: OrderDetail, as: 'items', foreignKey: 'id', otherKey: 'productId' });
OrderDetail.belongsTo(OrderDate, { as: 'orderDates', foreignKey: 'orderDateId' });

Product.belongsToMany(OrderDate, { through: OrderDetail, as: 'items' });
OrderDetail.belongsTo(Product, { as: 'products', foreignKey: 'productId' });


connection.sync({ alter: true });


