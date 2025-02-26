import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(spot) {
    spot._id = v4();
    spots.push(spot);
    return spot;
  },

  async getSpotById(id) {
    return spots.find((spot) => spot._id === id);
  },

  async deleteSpotById(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    spots.splice(index, 1);
  },

  async deleteAllSpots() {
    spots = [];
  },
};
