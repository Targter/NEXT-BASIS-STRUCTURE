import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
connectDB();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {token,newPassword} = reqBody;
        console.log(token,newPassword)
        if(!token && !newPassword) return NextResponse.json({message:"token and Password is required"})
        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordExpire:{$gt:Date.now()}})
        
    if(!user) return NextResponse.json({message:"Invalid Token Please Verify the token"})
        const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(newPassword,salt);
        user.isVerified = true; 
        user.forgotPasswordToken = undefined;
        user.password = hashedPassword;
        user.forgotPasswordExpire = undefined; 
        await user.save(); 
        return NextResponse.json({message:"Password Update successfully verified successfully",success:true})

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}