import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const spots = await db.spotStore.getAllSpots();
      const viewData = {
        title: "SpotSwap Dashboard",
        spots: spots,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addSpot: {
    handler: async function (request, h) {
      const newSpot = {
        title: request.payload.title,
      };
      await db.spotStore.addSpot(newSpot);
      return h.redirect("/dashboard");
    },
  },
};
