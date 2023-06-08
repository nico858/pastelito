import express from 'express';

import CategoryService from './../services/category.service.js';
import validatorHanlder from './../middlewares/validator.handler.js';
import { getCategorySchema, createCategorySchema, updateCategorySchema } from './../schemas/category.schema.js';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler.js';

const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHanlder(getCategorySchema, 'params'), 
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(getCategorySchema, 'params'),
  validatorHanlder(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(id, body);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await service.delete(id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
});

export default router;
