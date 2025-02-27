import { v4 } from "uuid";

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
    return collections.find((collection) => collection._id === id);
  },

  async deleteCollectionById(id) {
    const index = collections.findIndex((collection) => collection._id === id);
    collections.splice(index, 1);
  },

  async deleteAllCollections() {
    collections = [];
  },
};
