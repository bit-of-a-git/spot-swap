import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const CollectionSpec = {
  title: Joi.string().required(),
};

export const SpotSpec = {
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).precision(6).required(),
  longitude: Joi.number().min(-180).max(180).precision(6).required(),
};

export const SpotArray = Joi.array().items(SpotSpec).label("SpotArray");
