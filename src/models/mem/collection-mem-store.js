import { v4 } from "uuid";
import { spotMemStore } from "./spot-mem-store.js";

let collections = [];

export const collectionMemStore = {
  async getAllCollections() {
    return collections;
  },

  async addCollection(collection) {
    collection._id = v4();
    collections.push(collection);
    return collection;
  },

  async getCollectionById(id) {
    let list = collections.find((collection) => collection._id === id);
    if (list) {
      list.spots = await spotMemStore.getSpotsByCollectionId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCollections(userId) {
    return collections.filter((collection) => collection.userId === userId);
  },

  async deleteCollectionById(id) {
    const index = collections.findIndex((collection) => collection._id === id);
    if (index !== -1) collections.splice(index, 1);
  },

  async deleteAllCollections() {
    collections = [];
  },
};
