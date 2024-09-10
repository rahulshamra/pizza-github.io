import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userdata from "../models/userinfo";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import orderdata from "../models/orders";
// Function to connect to MongoDB using Mongoose
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

// POST request handler
export async function POST(req) {
    try {
        connectDB();
        let data= await req.json() 
        if (Array.isArray(data.order_data)) {
            // Adding the order_date at the beginning of the order_data array
            data.order_data.splice(0, 0, { order_date: data.order_date });
        } 
        let eID=await orderdata.findOne({Username:data.Username})
        if(eID){
 await orderdata.findOneAndUpdate({Username:data.Username},{$push:{order_data:data.order_data}})
 return NextResponse.json({success:true})
        }
        else{
            await orderdata.create({Username:data.Username,order_data:[data.order_data]})
            return NextResponse.json({success:true})
        }
      
     
  
}

    catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

// GET request handler
export async function GET(req) {
    try {
        await connectDB();
        let success=false
        const body = await req.body.json(); 
        let data = await userdata.findOne(body.Username);
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
        const jwtsecrate=process.env.jwtsecrate
        let authtoken= jwt.sign(tokendata,jwtsecrate)
        success=true
        return NextResponse.json({success:true,authtoken:authtoken})

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
