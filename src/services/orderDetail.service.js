import boom from '@hapi/boom';

import { OrderDetail, OrderDate, Product, User } from '../../db/models/index.js';

export default class OrderDetailService {
  constructor() {}

  async create(data) {
    const { clientId, products } = data;
    console.log("[1]")
    console.log(data)
    console.log(clientId)
    console.log(products)

    const user = await User.findOne({ where: { id: clientId }});
    if(!user) {
      throw boom.notFound('User not found');
    }
    console.log("[2]")
    const newOrderDate = await OrderDate.create({ userId: clientId });
    console.log("[3]")
    console.log(newOrderDate)

    const newOrderDetails = await Promise.all(products.map(async (product) => {
      console.log("[4]")
      const { productId, quantity } = product;
      console.log(product.quantity)
      const selectedProduct = await Product.findOne({ where: { id: productId }});
      console.log("[5]")
      if(!selectedProduct) {
        throw boom.notFound('Product not found');
      }
      if(selectedProduct.stock < quantity) {
        throw boom.badRequest('There is not enough stock');
      }
      console.log("[6]")
      const price = selectedProduct.price * quantity;
      console.log("[7]")
      console.log(`
        orderDateId: ${newOrderDate.id}
        productId: ${selectedProduct.id}
        quantity: ${product.quantity}
        price: ${price}
        `)
      const newOrderDetail = await OrderDetail.create({
        orderDateId: newOrderDate.id,
        productId,
        quantity,
        price,
      });
      console.log("[8]")
      const newStock = selectedProduct.stock - quantity;
      await selectedProduct.update({ stock: newStock });

      return newOrderDetail;
    }))

    const totalPrice = newOrderDetails.reduce((total, orderDetail) => total + orderDetail.price, 0);
    await newOrderDate.update({ totalPrice: totalPrice });
    return { newOrderDetails, totalPrice };
    // const product = await Product.findOne({ where: { id: productId }});
    // const user = await User.findOne({ where: { id: data.clientId }});

    // if(product.stock < quantity) {
    //   throw boom.badRequest('There is not enough stock');
    // }

    // if(user.siuuPoints < product.price * quantity) {
    //   throw boom.badRequest('You do not have enough siuu points');
    // }

    // const orderDate = await OrderDate.create({ clientId: data.clientId });
    // const newOrderDetail = await OrderDetail.create({
    //   orderDateId: orderDate.id,
    //   productId,
    //   quantity,
    //   price: product.price * quantity,
    // });

    // const newBalance = user.siuuPoints - product.price * quantity;
    // const newStock = product.stock - quantity;
    // await user.update({ siuuPoints: newBalance });
    // await product.update({ stock: newStock });
    
    // return newOrderDetail;
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
