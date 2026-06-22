import mongoose from "mongoose";
import { config } from "./config.js";

async function connectDB() {
    try {
        
        await mongoose.connect(config.MONGO_URI);
        console.log("database is connected");
        
    } catch (error) {
        throw new Error("database is not connected")
    }
}

export default connectDB