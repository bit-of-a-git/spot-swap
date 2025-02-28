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
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).precision(6).required(),
  longitude: Joi.number().min(-180).max(180).precision(6).required()
};