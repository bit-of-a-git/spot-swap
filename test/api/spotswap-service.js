import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const spotswapService = {
  spotswapUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.spotswapUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.spotswapUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.spotswapUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.spotswapUrl}/api/users`);
    return res.data;
  },

  async createCollection(collection) {
    const res = await axios.post(`${this.spotswapUrl}/api/collections`, collection);
    return res.data;
  },

  async deleteAllCollections() {
    const response = await axios.delete(`${this.spotswapUrl}/api/collections`);
    return response.data;
  },

  async deleteCollection(id) {
    const response = await axios.delete(`${this.spotswapUrl}/api/collections/${id}`);
    return response;
  },

  async getAllCollections() {
    const res = await axios.get(`${this.spotswapUrl}/api/collections`);
    return res.data;
  },

  async getCollection(id) {
    const res = await axios.get(`${this.spotswapUrl}/api/collections/${id}`);
    return res.data;
  },

  async getAllSpots() {
    const res = await axios.get(`${this.spotswapUrl}/api/spots`);
    return res.data;
  },

  async createSpot(id, spot) {
    const res = await axios.post(`${this.spotswapUrl}/api/collections/${id}/spots`, spot);
    return res.data;
  },

  async deleteAllSpots() {
    const res = await axios.delete(`${this.spotswapUrl}/api/spots`);
    return res.data;
  },

  async getSpot(id) {
    const res = await axios.get(`${this.spotswapUrl}/api/spots/${id}`);
    return res.data;
  },

  async deleteSpot(id) {
    const res = await axios.delete(`${this.spotswapUrl}/api/spots/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.spotswapUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
