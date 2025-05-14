import Mongoose from "mongoose";
import { Collection } from "./collection.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const collectionMongoStore = {
  async getAllCollections() {
    const collections = await Collection.find().lean();
    await Promise.all(
      collections.map(async (collection) => {
        collection.spots = await spotMongoStore.getSpotsByCollectionId(collection._id);
      })
    );
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
    const populatedCollection = await Collection.findById(collectionObj._id).populate("userId").lean();
    return populatedCollection;
  },

  async getUserCollections(id) {
    if (Mongoose.isValidObjectId(id)) {
      const collections = await Collection.find({ userId: id }).lean();
      await Promise.all(
        collections.map(async (collection) => {
          collection.spots = await spotMongoStore.getSpotsByCollectionId(collection._id);
        })
      );
      return collections;
    }
    return null;
  },

  async deleteCollectionById(id) {
    try {
      await spotMongoStore.deleteSpotsByCollectionId(id);
      await Collection.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteCollectionsByUserId(id) {
    try {
      await Collection.deleteMany({ userId: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCollections() {
    await Collection.deleteMany({});
  },

  async updateCollection(updatedCollection) {
    const collections = await Collection.findOne({ _id: updatedCollection._id });
    collections.title = updatedCollection.title;
    await collections.save();
  },
};
