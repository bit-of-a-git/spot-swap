import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec, NameSpec, UpdateEmailSpec, UpdatePasswordSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to SpotSwap" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for SpotSwap" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const newUser = request.payload;
      // Checks if there are any admin users in the database. If not, sets the first user to be an admin.
      // https://github.com/ki321g/Rugby-Club-POI/blob/main/src/controllers/accounts-controller.js
      const allUsers = await db.userStore.getAllUsers();
      const adminUsers = allUsers.filter((user) => user.role === "admin");
      if (adminUsers.length === 0) {
        newUser.role = "admin";
      } else {
        newUser.role = "user";
      }
      await db.userStore.addUser(newUser);
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to SpotSwap" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        const errors = [{ message: "Invalid email or password" }];
        return h.view("login-view", { title: "Log in error", errors: errors }).code(400);
      }
      request.cookieAuth.set({ id: user._id });
      if (user.role === "admin") {
        return h.redirect("/admin");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  editProfile: {
    handler: function (request, h) {
      const user = request.auth.credentials;
      if (user) {
        const viewData = {
          title: "Edit Profile",
          user: user,
          titleLink: "/dashboard",
        };
        return h.view("edit-profile", viewData);
      }
      return h.redirect("/");
    },
  },

  updateName: {
    validate: {
      payload: NameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-profile", { title: "Edit Profile Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { firstName, lastName } = request.payload;
      const user = request.auth.credentials;
      try {
        await db.userStore.updateName(user._id, firstName, lastName);
        return h.redirect("/edit-profile");
      } catch (err) {
        console.log(err);
        return h.redirect("/dashboard");
      }
    },
  },

  updateEmail: {
    validate: {
      payload: UpdateEmailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-profile", { title: "Edit Profile Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { oldEmail, newEmail } = request.payload;
      const user = request.auth.credentials;
      if (oldEmail === user.email) {
        try {
          await db.userStore.updateEmail(user, newEmail);
          return h.redirect("/edit-profile");
        } catch (err) {
          console.log(err);
          return h.redirect("/dashboard");
        }
      } else {
        console.log("Previous email was incorrect.");
        return h.redirect("/dashboard");
      }
    },
  },

  updatePassword: {
    validate: {
      payload: UpdatePasswordSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-profile", { title: "Edit Profile Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { currentPassword, newPassword, confirmNewPassword } = request.payload;
      const user = request.auth.credentials;
      if (currentPassword === user.password && newPassword === confirmNewPassword) {
        try {
          await db.userStore.updatePassword(user, newPassword);
          return h.redirect("/edit-profile");
        } catch (err) {
          console.log(err);
          return h.redirect("/dashboard");
        }
      } else {
        console.log("Previous password was incorrect.");
        return h.redirect("/dashboard");
      }
    },
  },
};
