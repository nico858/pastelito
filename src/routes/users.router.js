import express from 'express';

import UserService from './../services/user.service.js';
import validatorHandler from './../middlewares/validator.handler.js';
import { updateUserSchema, createUserSchema, getUserSchema } from './../schemas/user.schema.js';

const router = express.Router();
const service = new UserService();



router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:clientId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const user = await service.findOne(clientId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:clientId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const body = req.body;
      const user = await service.update(clientId, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:clientId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { clientId } = req.params;
      await service.delete(clientId);
      res.status(201).json({clientId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;

