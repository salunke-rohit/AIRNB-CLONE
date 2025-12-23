import express from "express";
import mongoose from "mongoose";
import path from "path" ;
import { fileURLToPath } from "url";
import Listing from "./models/listing.js"

const app = express();
const port = 3000 ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust')
}

main().then(()=>{
    console.log(" connected to database ");
}).catch((err)=>{
    console.log("error is = " , err)
})

app.get("/" , async (req , res ) =>{
    res.send("hi this is root ");
});

app.get("/test" , async (req , res)=>{
    let sample = new Listing ({
        title:"my new house",
        description:"with 3bhk in sky manas",
        price:320000,
        location:"pune",
        county:"india"
    })
   await sample.save();
   res.send("succesfull testing")
console.log("sample was saved");

})

app.listen( port , ()=>{
    console.log(`you are on ${port}`);
});
  