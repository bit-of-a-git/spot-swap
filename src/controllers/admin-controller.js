import { db } from "../models/db.js";
import {} from "../models/joi-schemas.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "Admin Console",
        users: users,
      };
      return h.view("admin-view", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },
};
