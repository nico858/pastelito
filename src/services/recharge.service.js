import boom from '@hapi/boom';

import { Recharge, User } from '../../db/models/index.js';

export default class RechargeService {
  constructor() {}

  async create(data, id) {
    const newRecharge = await Recharge.create(data);
    const user = await User.findOne(id);
    const newBalance = user.siuuPoints + data.cash;
    await user.update({ siuuPoints: newBalance });
    return newRecharge;
  }

  async find() {
    const response = await Recharge.findAll();
    return response;
  }

  async findOne(id) {
    const recharge = await Recharge.findByPk(id);
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
