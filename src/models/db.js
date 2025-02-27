import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  spotStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.spotStore = spotJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.spotStore = spotMemStore;
    }
  },
};
