import { db } from "../models/db.js";
import { CollectionSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const collections = await db.collectionStore.getAllCollections();
      const viewData = {
        title: "SpotSwap Dashboard",
        collections: collections,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCollection: {
    validate: {
      payload: CollectionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Collection error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const newCollection = {
        title: request.payload.title,
      };
      await db.collectionStore.addCollection(newCollection);
      return h.redirect("/dashboard");
    },
  },
};
