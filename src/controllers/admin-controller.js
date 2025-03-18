import Boom from "@hapi/boom";
import { db } from "../models/db.js";

async function isAdmin(request, h) {
  const user = request.auth.credentials;
  if (user.role !== "admin") {
    throw Boom.forbidden("You are not authorized to access this resource");
  }
  return h.continue;
}

export const adminController = {
  index: {
    pre: [{ method: isAdmin }],
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "Admin Console",
        users: users.filter((user) => !user._id.equals(loggedInUser._id)),
      };
      return h.view("admin-view", viewData);
    },
  },
  deleteUser: {
    pre: [{ method: isAdmin }],
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },
};
