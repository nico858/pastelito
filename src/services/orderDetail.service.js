import boom from '@hapi/boom';

import models from './../../db/database.js';

export default class OrderDetailService {
  constructor() {}

  async create(data) {
    const newOrderDetail = await models.OrderDetail.create(data);
    return newOrderDetail;
  }

  async find() {
    const response = await models.OrderDetail.findAll();
    return response;
  }

  async findOne(id) {
    const orderDetail = await models.OrderDetail.findByPk(id);
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
