import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";

export const db = {
  userStore: null,
  collectionStore: null,

  init() {
    this.userStore = userMemStore;
    this.collectionStore = collectionMemStore;
  },
};
