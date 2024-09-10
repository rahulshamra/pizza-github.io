import mongoose from "mongoose";
import { NextResponse } from "next/server";
import orderdata from "../models/orders";
async function connectDB() {
    try {
        if (mongoose.connection.readyState === 0) {
            let MongoURI=process.env.DB_URL
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

export async function POST(req) {
    try {
        await connectDB();
       const User= await req.json();
let res =await orderdata.findOne({Username:User.Username})
if(res){
        return NextResponse.json(res)
    }
     
    else{
        return NextResponse.json({success:false})

    }
    

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
