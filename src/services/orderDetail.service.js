import boom from '@hapi/boom';

import { OrderDetail, OrderDate, Product, User } from '../../db/models/index.js';

export default class OrderDetailService {
  constructor() {}

  async create(data) {
    const { productId, quantity } = data;
    const product = await Product.findOne({ where: { id: productId }});
    const user = await User.findOne({ where: { id: data.clientId }});

    if(product.stock < quantity) {
      throw boom.badRequest('There is not enough stock');
    }

    if(user.siuuPoints < product.price * quantity) {
      throw boom.badRequest('You do not have enough siuu points');
    }


    const orderDate = await OrderDate.create({ clientId: data.clientId });



    console.log(data)
    const newOrderDetail = await OrderDetail.create({
      orderDateId: orderDate.id,
      productId,
      quantity,
      price: product.price * quantity,
    });

    const newBalance = user.siuuPoints - product.price * quantity;
    const newStock = product.stock - quantity;
    await user.update({ siuuPoints: newBalance });
    await product.update({ stock: newStock });
    
    return newOrderDetail;
  }

  async find() {
    const response = await OrderDetail.findAll();
    return response;
  }

  async findOne(id) {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      throw boom.notFound('OrderDetail not found');
    }
    return orderDetail;
  }

  async update(id, changes) {
    const orderDetail = await this.findOne(id);
    const response = await orderDetail.update(changes);
    return response;
  }

  async delete(id) {
    const orderDetail = await this.findOne(id);
    await orderDetail.destroy();
    return { id };
  }
}
