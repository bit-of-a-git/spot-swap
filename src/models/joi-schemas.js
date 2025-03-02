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

export const UserArraySpec = Joi.array().items(UserSpecPlus).label("UserArray");

export const SpotSpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    latitude: Joi.number().min(-90).max(90).precision(6).required(),
    longitude: Joi.number().min(-180).max(180).precision(6).required(),
  })
  .label("Spot");

export const SpotSpecPlus = SpotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SpotSpecPlus");

export const SpotArraySpec = Joi.array().items(SpotSpecPlus).label("SpotArray");

export const CollectionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Historical spots in Galway"),
    userid: IdSpec,
    spots: SpotArraySpec,
  })
  .label("Collection");

export const CollectionSpecPlus = CollectionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CollectionPlus");

export const CollectionArraySpec = Joi.array().items(CollectionSpecPlus).label("CollectionArray");
