import express from "express";
import mongoose from "mongoose";
import path from "path" ;
import { fileURLToPath } from "url";
import Listing from "./models/listing.js"
import methodOverride from "method-override";
import ejsMate from "ejs-mate"
import wrapAsync from "./utils/wrapAsync.js";
import ExpressError from "./utils/ExpressError.js";


const app = express();
const port = 8080 ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname , "/public")));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust')
}

main().then(()=>{
    console.log(" connected to database ");
}).catch((err)=>{
    console.log("error is = " , err)
})

app.get("/" , wrapAsync(async (req , res ) =>{
    res.send("hi this is root ");
}));

// index Route
app.get("/listing", wrapAsync (async(req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));

// new Route 
app.get ("/listing/new" , wrapAsync( async (req , res )=>{
    res.render("listings/new")
}));

// show Route 
app.get ("/listing/:id" , wrapAsync ( async (req , res )=>{
    let { id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show" , {listing})
}));

// create Route 
app.post ("/listing" , wrapAsync ( async (req , res , next ) =>{
    try{
    const newListing = new Listing (req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    }
    catch(err){
        next(err);
    }
    
}));

// edit Route 
app.get ("/listing/:id/edit" , wrapAsync ( async (req , res )=>{
    let { id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit" , {listing} ) ;
}));

//update Route 
app.put("/listing/:id" , wrapAsync ( async (req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

// delete Route 
app.delete("/listing/:id" , wrapAsync (async (req , res )=>{
    let {id} = req.params;
    let DelListing = await Listing.findByIdAndDelete(id);
    console.log(DelListing);
    res.redirect("/listing")
    
}));

// error handler

app.use((req, res, next )=>{
    next( new ExpressError(404, "page not found! "))
})

app.use((err, req, res, next )=>{
    let {statusCode=500 , message="something went wrong!" } = err ;
    res.status(statusCode).send(message);
})

app.listen( port , ()=>{
    console.log(`you are on ${port}`);
});
   