import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newSpot = {
        title: request.payload.title,
      };
      await db.spotStore.addSpot(collection._id, newSpot);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};
