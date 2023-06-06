import Joi from 'joi';


const orderDetailId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer();
const price = Joi.number().integer();

export const createOrderDetailSchema = Joi.object({
  orderId: orderId, //temporal
  productId: productId.required(),
  quantity: quantity.required(),
  price: price.required(),
});

export const updateOrderDetailSchema = Joi.object({
  orderId: orderId, //temporal
  productId: productId,
  price: price,
  quantity: quantity,
});

export const getOrderDetailSchema = Joi.object({
  orderDetailId: orderDetailId.required(),
});