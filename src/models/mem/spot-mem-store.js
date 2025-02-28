import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(spotId, spot) {
    spot._id = v4();
    spot.spotid = spotId;
    spots.push(spot);
    return spot;
  },

  async getSpotsByCollectionId(id) {
    return spots.filter((spot) => spot.spotid === id);
  },

  async getSpotById(id) {
    const foundSpot = spots.find((spot) => spot._id === id);
    if (!foundSpot) {
      return null;
    }
    return foundSpot
  },

  async getCollectionSpots(spotId) {
    return spots.filter((spot) => spot.spotid === spotId);
  },

  async deleteSpot(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    if (index !== -1) spots.splice(index, 1);
  },

  async deleteAllSpots() {
    spots = [];
  },

  async updateSpot(spot, updatedSpot) {
    spot.name = updatedSpot.name;
  },
};
