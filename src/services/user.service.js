import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
// import { DataRowMessage } from 'pg-protocol/dist/messages';

import models from './../../db/database.js';

export default class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.userPassword, 10);
    const newUser = await models.User.create({
      ...data,
      userPassword: hash,
      include: ['address']
    });
    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: ['address']
    });
    return response;
  }

  async findByUsername(username) {
    const response = await models.User.findOne({
      where: { username }
    });
    return response;
  }

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(clientId) {
    const user = await models.User.findByPk(clientId);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(clientId, changes) {
    const user = await this.findOne(clientId);
    const response = await user.update(changes);
    return response;
  }

  async delete(clienteId) {
    const user = await this.findOne(clienteId);
    await user.destroy();
    return { clienteId };
  }
}
