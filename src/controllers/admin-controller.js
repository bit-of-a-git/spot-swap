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
        titleLink: "/admin",
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
  collections: {
    pre: [{ method: isAdmin }],
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const filteredUsers = users.filter((user) => !user._id.equals(loggedInUser._id));

      const usersAndCollections = filteredUsers.map(async (user) => {
        user.collections = await db.collectionStore.getUserCollections(user._id);
        return user;
      });
      const updatedUsers = await Promise.all(usersAndCollections);

      const viewData = {
        title: "Admin Console",
        users: updatedUsers,
        titleLink: "/admin",
      };
      return h.view("admin-collections", viewData);
    },
  },
};
