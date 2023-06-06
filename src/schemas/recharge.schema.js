import Joi from 'joi';

const rechargeId = Joi.number().integer();
const clientId = Joi.number().integer();
const cash = Joi.number().integer();
const dateRecharge = Joi.date();

export const createRechargeSchema = Joi.object({
  clientId: clientId.required(),
  cash: cash.required(),
});

export const updateRechargeSchema = Joi.object({
  clientId: clientId,
  cash: cash,
});

export const getRechargeSchema = Joi.object({
  rechargeId: rechargeId.required(),
});
