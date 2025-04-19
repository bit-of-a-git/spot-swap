import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserArraySpec, UserSpec, UserSpecPlus, UserCredentialsSpec, IdSpec, JWTSpec, NameSpec, UpdateEmailSpec, UpdatePasswordSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return h.response(users).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArraySpec, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No user with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details matching the specified id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Deletes all users from the SpotSwap database",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteUserById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete specific user",
    notes: "Deletes one user from the SpotSwap database",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticates a user",
    notes: "Creates and returns a JWT token if the user's credentials are valid. Otherwise returns 401 error.",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JWTSpec, failAction: validationError },
  },

  updateName: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updateName(request.params.id, request.payload.firstName, request.payload.lastName);
        if (user === null) {
          return Boom.notFound("No user found matching the provided ID");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Updates a user's name",
    notes: "Updates first and last names of user matching specified ID",
    validate: { payload: NameSpec, params: { id: IdSpec }, failAction: validationError },
  },

  updateEmail: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updateEmail(request.params.id, request.payload.newEmail);
        if (user === null) {
          return Boom.notFound("No user found matching the provided ID");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Updates a user's email",
    notes: "Updates the email of a user matching the specified ID",
    validate: { payload: UpdateEmailSpec, params: { id: IdSpec }, failAction: validationError },
  },

  updatePassword: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updatePassword(request.params.id, request.payload.newPassword);
        if (user === null) {
          return Boom.notFound("No user found matching the provided ID");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Updates a user's email",
    notes: "Updates the email of a user matching the specified ID",
    validate: { payload: UpdatePasswordSpec, params: { id: IdSpec }, failAction: validationError },
  },
};
