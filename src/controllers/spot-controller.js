import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const spotController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      const spots = await db.spotStore.getAllSpots();
      const viewData = {
        title: "Spots",
        spots: spots,
      };
      return h.view("spot-view", viewData);
    },
  },
};
