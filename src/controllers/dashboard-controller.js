import { db } from "../models/db.js";
import { CollectionSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const collections = await db.collectionStore.getUserCollections(loggedInUser._id);
      const viewData = {
        title: "SpotSwap Dashboard",
        user: loggedInUser,
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
      const loggedInUser = request.auth.credentials;
      const newCollection = {
        userId: loggedInUser._id,
        title: request.payload.title,
      };
      await db.collectionStore.addCollection(newCollection);
      return h.redirect("/dashboard");
    },
  },

  deleteCollection: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.collectionStore.deleteCollectionById(collection._id);
      return h.redirect("/dashboard");
    },
  },
};
