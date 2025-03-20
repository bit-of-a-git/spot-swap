import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  img: String,
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Spot = Mongoose.model("Spot", spotSchema);
