/**
 * @swagger
 * components:
 *  schemas:
 *   Recharge:
 *    type: object
 *    required:
 *      - clientId
 *      - cash
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the recharge.
 *      clientId:
 *        type: integer
 *        description: The id of the client that will receive the recharge.
 *      cash:
 *        type: integer
 *        description: Amount of siuu points that will be recharge.
 *      dateRecharge:
 *        type: date
 *        description: Date of the recharge.
*/
/**
 * @swagger
 * tags:
 *   name: Recharge
 *   description: The recharge managing API
 * /recharge:
 *   get:
 *     summary: Lists all the recharges
 *     tags: [Recharge]
 *     responses:
 *       200:
 *         description: The list of the recharges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recharge'
 *   post:
 *     summary: Create a new recharge
 *     tags: [Recharge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recharge'
 *     responses:
 *       200:
 *         description: The created recharge.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recharge'
 *       500:
 *         description: Server error
 * /recharge/{id}:
 *   get:
 *     summary: Get the recharge by id
 *     tags: [Recharge]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recharge id
 *     responses:
 *       200:
 *         description: The recharge response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recharge'
 *       404:
 *         description: The recharge was not found
 *   patch:
 *    summary: Update the recharge by the id
 *    tags: [Recharge]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The recharge id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recharge'
 *    responses:
 *      200:
 *        description: The recharge was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recharge'
 *      404:
 *        description: The recharge was not found
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Remove the recharge by id
 *     tags: [Recharge]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recharge id
 *
 *     responses:
 *       200:
 *         description: The recharge was deleted
 *       404:
 *         description: The recharge was not found
 */


import express from 'express';
import passport from 'passport';

import RechargeService from '../services/recharge.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createRechargeSchema, updateRechargeSchema, getRechargeSchema } from '../schemas/recharge.schema.js';

const router = express.Router();
const service = new RechargeService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
  try {
    const recharges = await service.find();
    res.json(recharges);
  } catch (error) {
    next(error);
  }
});

router.get('/:rechargeId',
  passport.authenticate('jwt', {session: false}),
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
  passport.authenticate('jwt', {session: false}),
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
  passport.authenticate('jwt', {session: false}),
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
  passport.authenticate('jwt', {session: false}),
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
