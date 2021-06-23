import mongoose from "mongoose";
import Double from "@mongoosejs/double";

const { Schema } = mongoose;

const reviewsSchema = new Schema(
  {
    name: String,
    raiting: Number,
    comments: String,
  },
  { timestamps: true }
);

const restaurantsSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    neighborhood: { type: String },
    address: { type: String },
    image: { type: String },
    latlng: {
      lat: { type: Double },
      lng: { type: Double },
    },
    cuisine_type: { type: String },
    reviews: [reviewsSchema],
  },
  { timestamps: true }
);

// const Restaurant = mongoose.model("Restaurant", restaurantsSchema);

export default mongoose.model("Restaurants", restaurantsSchema);
