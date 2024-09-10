import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userdata from "../models/userinfo";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const jwtsecrate="@49fksaf"
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
   let authtoken;
        let data= await req.json()
        let success=false
        const salt= await bcrypt.genSalt(10);
        const securepass =await bcrypt.hash(data.Password,salt);
        await connectDB();
        const check=await userdata.findOne({Username:data.Username})
        if(check){
        return NextResponse.json({ success: false} );
        }
 else if(!check){
  const user=await userdata.create({
Username:data.Username,
Password:securepass,
Email:data.Email,
Address:data.Address
})
let tokendata={ 
    user:{
        id:user["_id"]
    }
}
   authtoken= jwt.sign(tokendata,jwtsecrate)
    success=true
    return NextResponse.json({success:true,authtoken:authtoken})
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
        let data = await userdata.findOne(body.Email);
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
