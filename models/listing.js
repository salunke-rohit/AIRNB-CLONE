import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://mycrwork.com/partner/vphotos/NoPhoto.png"
    }
  },

  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
