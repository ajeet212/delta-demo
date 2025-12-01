const mongoose = require("mongoose");
const Review = require("./review.js");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: String,

  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geomatry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  category: {
    type: String,
    enum: [
      "house",
      "rooms",
      "iconic city",
      "mountains",
      "castles",
      "amazing pools",
      "farms",
      "flat",
      "hotels",
      "guest house",
      "campings",
    ],
    required: true,
  },
});

listingSchema.post("findOneAndDelete", async (data) => {
  if (data.review.length) {
    let res = await Review.deleteMany({ _id: { $in: data.review } });
    console.log(res);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
