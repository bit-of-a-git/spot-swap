import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
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
      };
      await db.spotStore.addSpot(collection._id, newSpot);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};
