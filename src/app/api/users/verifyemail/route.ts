import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB()


export async function POST(request:NextRequest){
    try{
        // console.log("called this")
        // console.log(await request.json())
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token",token)
        const user = await User.findOne({verifyToken:token,verifyTokenExpire:{$gt:Date.now()}})
        console.log("user:",user)
        if(!user) {
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
 
        user.isVerified = true; 
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined; 
        await user.save(); 

        //send verification email 
       
        return NextResponse.json({message:"Email verified successfully",success:true})

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}