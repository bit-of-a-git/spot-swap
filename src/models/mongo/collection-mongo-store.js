import Mongoose from "mongoose";
import { Collection } from "./collection.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const collectionMongoStore = {
  async getAllCollections() {
    const collections = await Collection.find().lean();
    return collections;
  },

  async getCollectionById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const collection = await Collection.findOne({ _id: id }).lean();
      if (collection) {
        collection.spots = await spotMongoStore.getSpotsByCollectionId(collection._id);
      }
      return collection;
    }
    return null;
  },

  async addCollection(collection) {
    const newCollection = new Collection(collection);
    const collectionObj = await newCollection.save();
    return this.getCollectionById(collectionObj._id);
  },

  async getUserCollections(id) {
    const collection = await Collection.find({ userId: id }).lean();
    return collection;
  },

  async deleteCollectionById(id) {
    try {
      await Collection.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCollections() {
    await Collection.deleteMany({});
  },
};
