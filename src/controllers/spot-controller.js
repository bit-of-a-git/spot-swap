import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const spotController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      let spots;
      const categories = await db.categoryStore.getAllCategories();
      const { categoryId } = await request.query;
      if (categoryId) {
        spots = await db.spotStore.getSpotsByCategoryId(categoryId);
      } else {
        spots = await db.spotStore.getAllSpots();
      }
      const viewData = {
        title: "Spots",
        spots: spots,
        categories: categories,
      };
      return h.view("spot-view", viewData);
    },
  },
};
