import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const spotController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      let spots;
      const categories = await db.categoryStore.getAllCategories();
      const { categoryId } = await request.query;
      if (categoryId) {
        spots = await db.spotStore.getSpotsByCategoryId(categoryId);
      } else {
        spots = await db.spotStore.getAllSpots();
      }
      const viewData = {
        title: "Spots",
        spots: spots,
        categories: categories,
      };
      return h.view("spot-view", viewData);
    },
  },
  uploadImage: {
    handler: async function (request, h) {
      const collectionId = request.params.id;
      const spotId = request.params.spotid;
      try {
        const spot = await db.spotStore.getSpotById(spotId);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          spot.img = url;
          await db.spotStore.updateSpot(spot);
        }
        return h.redirect(`/collection/${spot.collectionId}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${spot.collectionId}`);
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
      const collectionId = request.params.id;
      const spotId = request.params.spotid;
      try {
        const spot = await db.spotStore.getSpotById(spotId);
        if (spot.img) {
          const url = new URL(spot.img);
          const pathSegments = url.pathname.split("/");
          const publicId = pathSegments[pathSegments.length - 1].split(".")[0];
          await imageStore.deleteImage(publicId);
          delete spot.img;
          await db.spotStore.updateSpot(spot);
        }
        return h.redirect(`/collection/${collectionId}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collectionId}`);
      }
    },
  },
};
