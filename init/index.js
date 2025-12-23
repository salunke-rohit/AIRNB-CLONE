import mongoose from "mongoose";
import initData from "./data.js"
import Listen from "../models/listing.js";


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust')
}

main().then(()=>{
    console.log(" connected to database ");
}).catch((err)=>{
    console.log("error is = " , err)
})

const initDB = async ()=>{
    await Listen.deleteMany({});
    await Listen.insertMany(initData.data);
    console.log("data was initilized")
}

initDB();