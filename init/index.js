const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'66823a613f3f08a5b7d17f23',}));
    initData.data = initData.data.map((obj)=>({...obj,geometry:{type: "Point", coordinates:[77.029, 23.55] }}));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();