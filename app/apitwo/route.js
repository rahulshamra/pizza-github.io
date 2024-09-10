import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userdata from "../models/userinfo";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
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
        let success=false
        const jwtsecrate =process.env.jwtsecrate
        const body = await req.json(); 
        let data = await userdata.findOne({Username:body.Username});
        let password= data.Password;
        if(!data){
            return NextResponse.json({ success: false, error: error.message });
        }
        let pwdcompare= await bcrypt.compare(body.Password,password)
        if(!pwdcompare){
            return NextResponse.json({ success: false, error: error.message });
        }
        let tokendata={ 
            user:{
                id:data["_id"]
            }
        }
        let authtoken= jwt.sign(tokendata,jwtsecrate)
        success=true
        return NextResponse.json({success:true,authtoken:authtoken})

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
