import mongoose, { Schema } from "mongoose";

  const listingSchema = new mongoose.Schema ({
    title: {
        type:String,
        required:true
    },

    description:String,
    
    image: {
        type:String,
        default: "https://mycrwork.com/partner/vphotos/NoPhoto.png",
        set: (v) => 
        !v || v.length === 0
        ? "https://mycrwork.com/partner/vphotos/NoPhoto.png"
        : v

    },
    price:Number,
    location:String,
    county:String
})        

const Listen = mongoose.model("Listing" , listingSchema);

export default Listen;