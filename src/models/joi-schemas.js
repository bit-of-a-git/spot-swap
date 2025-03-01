import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
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
  longitude: Joi.number().min(-180).max(180).precision(6).required(),
};
