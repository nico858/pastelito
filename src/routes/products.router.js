import express from 'express';
import passport from 'passport';

import ProductsService from './../services/product.service.js';
import validatorHandler from './../middlewares/validator.handler.js';
import { createProductSchema, updateProductSchema, getProductSchema } from './../schemas/product.schema.js';
import { checkRoles } from '../middlewares/auth.handler.js';


const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res, next) => {
  res.json({ message: 'products' })
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await service.findOne(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles(['admin']),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:productId',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const body = req.body;
      const product = await service.update(productId, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
