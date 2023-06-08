import express from 'express';
import passport from 'passport';

import AddressService from '../services/address.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { updateAddressSchema, createAddressSchema, getAddressSchema } from '../schemas/address.schema.js';

const router = express.Router();
const service = new AddressService();



router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const addresses = await service.find();
    res.json(addresses);
  } catch (error) {
    next(error);
  }
});

router.get('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const address = await service.findOne(addressId);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createAddressSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAddress = await service.create(body);
      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  validatorHandler(updateAddressSchema, 'body'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const body = req.body;
      const address = await service.update(addressId, body);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      await service.delete(addressId);
      res.status(201).json({addressId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
