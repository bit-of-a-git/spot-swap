import bcrypt from "bcrypt";
import Mongoose from "mongoose";
import { saltRounds } from "../../utils/config.js";
import { User } from "./user.js";
import { collectionMongoStore } from "./collection-mongo-store.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await collectionMongoStore.deleteCollectionsByUserId(id);
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateName(id, firstName, lastName) {
    try {
      await User.updateOne({ _id: id }, { $set: { firstName: firstName, lastName: lastName } });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updateEmail(id, newEmail) {
    try {
      await User.updateOne({ _id: id }, { $set: { email: newEmail } });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    } catch (error) {
      console.log(`Error updating password for user ${id}: ${error.message}`);
    }
  },
};
