import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { SpotArraySpec, SpotSpec, SpotSpecPlus, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";
import { fileTypeFromBuffer } from "file-type";

export const spotApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spots = await db.spotStore.getAllSpots();
        return h.response(spots).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: SpotArraySpec, failAction: validationError },
    description: "Get all spots",
    notes: "Returns all spots",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return h.response(spot).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific spot",
    notes: "Returns spot details matching the specified id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.addSpot(request.params.id, request.payload);
        if (spot) {
          return h.response(spot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a spot",
    notes: "Returns the newly created spot",
    validate: { params: { id: IdSpec }, payload: SpotSpec },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.spotStore.deleteAllSpots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all spots",
    notes: "Deletes all spots from the SpotSwap database",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        await db.spotStore.deleteSpot(spot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Spot with this id:", err);
      }
    },
    tags: ["api"],
    description: "Delete a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        const file = request.payload.imagefile;
        // Uses the file-type library to detect the file type
        const detectedFileType = await fileTypeFromBuffer(file);
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        // If there is no detected file type, or if the detected file type is not in the allowed list, return an error
        if (!detectedFileType || !allowedMimeTypes.includes(detectedFileType.mime)) {
          return Boom.unsupportedMediaType("Invalid file type. Only supported image formats are allowed based on file content.");
        }
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          spot.images = spot.images || [];
          spot.images.push(url);
          await db.spotStore.updateSpot(spot);
        }
        return h.response(spot).code(201);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable(`Error uploading image:${err}`);
      }
    },
    payload: {
      // Add this payload configuration
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Create a spot image",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        const { index } = request.payload;
        const imageUrl = spot.images[index];
        const url = new URL(imageUrl);
        const pathSegments = url.pathname.split("/");
        const publicId = pathSegments[pathSegments.length - 1].split(".")[0];
        await imageStore.deleteImage(publicId);

        spot.images.splice(index, 1);
        await db.spotStore.updateSpot(spot);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
    tags: ["api"],
    description: "Delete a spot image",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
