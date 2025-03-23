import Joi from "joi";
import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
        titleLink: "/dashboard",
      };
      return h.view("collection-view", viewData);
    },
  },

  addSpot: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("collection-view", { title: "Add Spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newSpot = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        category: request.payload.category,
      };
      await db.spotStore.addSpot(collection._id, newSpot);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  deleteSpot: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.spotStore.deleteSpot(request.params.spotid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};
