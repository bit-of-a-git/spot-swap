import Mongoose from "mongoose";
import { Spot } from "./spot.js";
import { Collection } from "./collection.js";

export const spotMongoStore = {
  async getAllSpots() {
    const spots = await Spot.find().lean();
    return spots;
  },

  async addSpot(collectionId, categoryId, spot) {
    spot.collectionId = collectionId;
    spot.categoryId = categoryId;
    const newSpot = new Spot(spot);
    const spotObj = await newSpot.save();
    return this.getSpotById(spotObj._id);
  },

  async getSpotsByCollectionId(id) {
    const spots = await Spot.find({ collectionId: id }).lean();
    return spots;
  },

  async getSpotsByCategoryId(id) {
    const spots = await Spot.find({ categoryId: id }).lean();
    return spots;
  },

  async getSpotById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const spot = await Spot.findOne({ _id: id }).lean();
      return spot;
    }
    return null;
  },

  async deleteSpot(id) {
    try {
      await Spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteSpotsByCollectionId(collectionId) {
    try {
      await Spot.deleteMany({ collectionId: collectionId });
    } catch (error) {
      console.log("bad collection id");
    }
  },

  async deleteAllSpots() {
    await Spot.deleteMany({});
  },

  async updateSpot(updatedSpot) {
    const spotDoc = await Spot.findOne({ _id: updatedSpot._id });
    spotDoc.name = updatedSpot.name;
    spotDoc.description = updatedSpot.description;
    spotDoc.latitude = updatedSpot.latitude;
    spotDoc.longitude = updatedSpot.longitude;
    spotDoc.img = updatedSpot.img;
    await spotDoc.save();
  },
};
