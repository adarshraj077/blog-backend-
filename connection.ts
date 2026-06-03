require("dotenv").config()
import mongoose from "mongoose";

const mongourl = process.env.MONGO_URL;

const connectdb = async () => {

    if (!mongourl) {
        throw new Error("MONGO_URL not found in .env");
    }
    await mongoose.connect(mongourl)
        .then(() => {
            console.log("mongodb connected");
        });
};

export default connectdb;