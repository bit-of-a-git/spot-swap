import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const newCollection = {
        title: request.payload.title,
      };
      await db.collectionStore.addCollection(newCollection);
      return h.redirect("/dashboard");
    },
  },
};
