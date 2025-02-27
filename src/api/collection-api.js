import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const collectionApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const collections = await db.collectionStore.getAllCollections();
        return collections;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        if (!collection) {
          return Boom.notFound("No Collection with this id");
        }
        return collection;
      } catch (err) {
        return Boom.serverUnavailable("No Collection with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const newCollection = await db.collectionStore.addCollection(collection);
        if (newCollection) {
          return h.response(newCollection).code(201);
        }
        return Boom.badImplementation("error creating collection");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        if (!collection) {
          return Boom.notFound("No Collection with this id");
        }
        await db.collectionStore.deleteCollectionById(collection._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Collection with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.collectionStore.deleteAllCollections();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
