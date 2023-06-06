import express from 'express';

import RechargeService from '../services/recharge.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createRechargeSchema, updateRechargeSchema, getRechargeSchema } from '../schemas/recharge.schema.js';

const router = express.Router();
const service = new RechargeService();

router.get('/', async (req, res, next) => {
  try {
    const recharges = await service.find();
    res.json(recharges);
  } catch (error) {
    next(error);
  }
});

router.get('/:rechargeId',
  validatorHandler(getRechargeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { rechargeId } = req.params;
      const recharge = await service.findOne(rechargeId);
      res.json(recharge);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createRechargeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRecharge = await service.create(body);
      res.status(201).json(newRecharge);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:rechargeId',
  validatorHandler(getRechargeSchema, 'params'),
  validatorHandler(updateRechargeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { rechargeId } = req.params;
      const body = req.body;
      const recharge = await service.update(rechargeId, body);
      res.json(recharge);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:rechargeId',
  validatorHandler(getRechargeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { rechargeId } = req.params;
      await service.delete(rechargeId);
      res.status(201).json({rechargeId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
