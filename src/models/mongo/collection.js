import Mongoose from "mongoose";

const { Schema } = Mongoose;

const collectionSchema = new Schema({
  title: String,
  county: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Collection = Mongoose.model("Collection", collectionSchema);
