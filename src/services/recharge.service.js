import boom from '@hapi/boom';

import models from './../../db/database.js';

export default class RechargeService {
  constructor() {}

  async create(data) {
    const newRecharge = await models.Recharge.create(data);
    return newRecharge;
  }

  async find() {
    const response = await models.Recharge.findAll();
    return response;
  }

  async findOne(id) {
    const recharge = await models.Recharge.findByPk(id);
    if (!recharge) {
      throw boom.notFound('Recharge not found');
    }
    return recharge;
  }

  async update(id, changes) {
    const recharge = await this.findOne(id);
    const response = await recharge.update(changes);
    return response;
  }

  async delete(id) {
    const recharge = await this.findOne(id);
    await recharge.destroy();
    return { id };
  }
}
