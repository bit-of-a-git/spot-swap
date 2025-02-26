import { userMemStore } from "./mem/user-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

export const db = {
  userStore: null,
  spotStore: null,

  init() {
    this.userStore = userMemStore;
    this.spotStore = spotMemStore;
  },
};
