import mongoose from "mongoose";
import { NextResponse } from "next/server";
import pizzadata from "@/app/models/pizzadata";
// Function to connect to MongoDB using Mongoose
async function connectDB() {
    try {
        if (mongoose.connection.readyState === 0) {
            const MongoURI=process.env.DB_URL
            await mongoose.connect(MongoURI);
            console.log("Connected to MongoDB");
        } else {
            console.log("Already connected to MongoDB"); 
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to database");
    }
}




// GET request handler
export async function GET(req) {
    try {
        await connectDB();
        let data = await pizzadata.find();
        return NextResponse.json( data );
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
