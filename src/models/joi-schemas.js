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
}).label("User");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  role: Joi.string().valid("admin", "user").required(),
}).label("UserPlus");

export const UserArraySpec = Joi.array().items(UserSpecPlus).label("UserArray");

export const NameSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
  })
  .label("Name");

export const UpdateEmailSpec = Joi.object()
  .keys({
    oldEmail: Joi.string().email().example("homer@simpson.com").required(),
    newEmail: Joi.string().email().example("maggie@simpson.com").required(),
  })
  .label("Email");

export const UpdatePasswordSpec = Joi.object()
  .keys({
    currentPassword: Joi.string().example("secret").required(),
    newPassword: Joi.string().example("supersecret").required(),
    confirmNewPassword: Joi.string().example("supersupersecret").required(),
  })
  .label("Password");

export const SpotSpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    latitude: Joi.number().min(-90).max(90).precision(6).required(),
    longitude: Joi.number().min(-180).max(180).precision(6).required(),
    category: Joi.string().example("Nature & Outdoors").required(),
  })
  .label("Spot");

export const SpotSpecPlus = SpotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  collectionId: IdSpec,
  img: Joi.string().allow("").optional(),
}).label("SpotPlus");

export const SpotArraySpec = Joi.array().items(SpotSpecPlus).label("SpotArray");

export const CollectionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Historical spots in Galway"),
    county: Joi.string().required().example("Galway"),
  })
  .label("Collection");

export const CollectionSpecPlus = CollectionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  userId: IdSpec,
  spots: SpotArraySpec.optional(),
}).label("CollectionPlus");

export const CollectionArraySpec = Joi.array().items(CollectionSpecPlus).label("CollectionArray");

export const JWTSpec = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("xxxxx.yyyyy.zzzzz").required(),
  })
  .label("JWT");
