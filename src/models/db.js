import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  spotStore: null,

  init() {
    this.userStore = userMemStore;
    this.collectionStore = collectionMemStore;
    this.spotStore = spotMemStore;
  },
};
