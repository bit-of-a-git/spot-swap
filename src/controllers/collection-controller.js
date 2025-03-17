import Joi from "joi";
import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const categories = await db.categoryStore.getAllCategories();
      const viewData = {
        title: "Collection",
        collection: collection,
        categories: categories,
      };
      return h.view("collection-view", viewData);
    },
  },

  addSpot: {
    validate: {
      payload: SpotSpec.keys({
        category: Joi.string().required(),
      }),
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("collection-view", { title: "Add Spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const category = await db.categoryStore.getCategoryById(request.payload.category);
      const newSpot = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.spotStore.addSpot(collection._id, category._id, newSpot);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  deleteSpot: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.spotStore.deleteSpot(request.params.spotid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          collection.img = url;
          await db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        if (collection.img) {
          const url = new URL(collection.img);
          const pathSegments = url.pathname.split("/");
          const publicId = pathSegments[pathSegments.length - 1].split(".")[0];
          await imageStore.deleteImage(publicId);
          delete collection.img;
          await db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
  },
};
