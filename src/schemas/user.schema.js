import Joi from 'joi';

const clientId = Joi.number().integer();
const firstName = Joi.string().max(40);
const lastName = Joi.string().max(60);
const username = Joi.string().min(5).max(15);
const userPassword = Joi.string().min(8);
const email = Joi.string().email();
const phone = Joi.string().min(10).max(10);
const role = Joi.string().min(5);
const addressId = Joi.string().min(5);

const nomecature = Joi.string().min(10).max(40);
const detail = Joi.string().min(5).max(20);

export const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  username: username.required(),
  userPassword: userPassword.required(),
  email: email.required(),
  phone: phone.required(),
  address: Joi.object({
    nomecature: nomecature.required(),
    detail: detail.required(),
  })
});

export const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  username: username,
  userPassword: userPassword,
  email: email,
  phone: phone,
  role: role,
  addressId: addressId,
});

export const getUserSchema = Joi.object({
  clientId: clientId.required(),
});
