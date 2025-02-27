import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const CollectionSpec = {
  title: Joi.string().required(),
};

export const SpotSpec = {
  title: Joi.string().required(),
};