import { userApi } from "./api/user-api.js";
import { collectionApi } from "./api/collection-api.js";
import { spotApi } from "./api/spot-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "PATCH", path: "/api/users/{id}/name", config: userApi.updateName },
  { method: "PATCH", path: "/api/users/{id}/email", config: userApi.updateEmail },
  { method: "PATCH", path: "/api/users/{id}/password", config: userApi.updatePassword },

  { method: "POST", path: "/api/collections", config: collectionApi.create },
  { method: "DELETE", path: "/api/collections", config: collectionApi.deleteAll },
  { method: "GET", path: "/api/collections", config: collectionApi.find },
  { method: "GET", path: "/api/collections/{id}", config: collectionApi.findOne },
  { method: "DELETE", path: "/api/collections/{id}", config: collectionApi.deleteOne },

  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "POST", path: "/api/collections/{id}/spots", config: spotApi.create },
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },
];
