import Mongoose from "mongoose";
import { Category } from "./category.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.spots = await spotMongoStore.getSpotsByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },
};
