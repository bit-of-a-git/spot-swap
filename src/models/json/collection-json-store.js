import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { spotJsonStore } from "./spot-json-store.js";

export const collectionJsonStore = {
  async getAllCollections() {
    await db.read();
    return db.data.collections;
  },

  async addCollection(collection) {
    await db.read();
    collection._id = v4();
    db.data.collections.push(collection);
    await db.write();
    return collection;
  },

  async getCollectionById(id) {
    await db.read();
    const list = db.data.collections.find((collection) => collection._id === id);
    list.spots = await spotJsonStore.getSpotsByCollectionId(list._id);
    return list;
  },

  async getUserCollections(userId) {
    await db.read();
    return db.data.collections.filter((collection) => collection.userId === userId);
  },

  async deleteCollectionById(id) {
    await db.read();
    const index = db.data.collections.findIndex((collection) => collection._id === id);
    db.data.collections.splice(index, 1);
    await db.write();
  },

  async deleteAllCollections() {
    db.data.collections = [];
    await db.write();
  },
};
