import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(collectionId, spot) {
    await db.read();
    spot._id = v4();
    spot.collectionId = collectionId;
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async getSpotsByCollectionId(id) {
    await db.read();
    return db.data.spots.filter((spot) => spot.collectionId === id);
  },

  async getSpotById(id) {
    await db.read();
    const foundSpot = db.data.spots.find((spot) => spot._id === id);
    if (!foundSpot) {
      return null;
    }
    return foundSpot;
  },

  async deleteSpot(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);
    if (index !== -1) db.data.spots.splice(index, 1);
    await db.write();
  },

  async deleteAllSpots() {
    db.data.spots = [];
    await db.write();
  },

  async updateSpot(spot, updatedSpot) {
    spot.name = updatedSpot.name;
    await db.write();
  },
};
