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


User.hasMany(Address, { as: 'addresses', foreignKey: 'addressId' });
Address.belongsTo(User, { as: 'users' });

User.hasMany(OrderDate, { as: 'orderDates' });
OrderDate.belongsTo(User, { as: 'users' });

User.hasMany(Recharge, { as: 'recharges', foreignKey: 'rechargeId' });
Recharge.belongsTo(User, { as: 'users' });

// User.hasMany(OrderDetail, { as: 'orderDetails' });
// OrderDetail.belongsTo(User, { as: 'users' });

Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' });
Product.belongsTo(Category, { as: 'categories' });

// OrderDate.hasMany(OrderDetail, { as: 'orderDetails' });
// OrderDetail.belongsTo(OrderDate, { as: 'orderDates' });

// Product.hasMany(OrderDetail, { as: 'orderDetails' });
// OrderDetail.belongsTo(Product, { as: 'products' });


connection.sync();


