import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { collectionController } from "./controllers/collection-controller.js";
import { spotController } from "./controllers/spot-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/edit-profile", config: accountsController.editProfile },
  { method: "POST", path: "/edit-profile/update-name", config: accountsController.updateName },
  { method: "POST", path: "/edit-profile/update-email", config: accountsController.updateEmail },
  { method: "POST", path: "/edit-profile/update-password", config: accountsController.updatePassword },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcollection", config: dashboardController.addCollection },
  { method: "GET", path: "/dashboard/deletecollection/{id}", config: dashboardController.deleteCollection },

  { method: "GET", path: "/collection/{id}", config: collectionController.index },
  { method: "POST", path: "/collection/{id}/addspot", config: collectionController.addSpot },
  { method: "GET", path: "/collection/{id}/deletespot/{spotid}", config: collectionController.deleteSpot },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  { method: "GET", path: "/spots", config: spotController.index },
  { method: "POST", path: "/collection/{id}/uploadspotimage/{spotid}", config: spotController.uploadImage },
  { method: "GET", path: "/collection/{id}/deletespotimage/{spotid}", config: spotController.deleteImage },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/collections", config: adminController.collections },
  { method: "GET", path: "/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/analytics", config: adminController.analytics },
];
