import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB()
export async function GET(request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
        // console.log('userId',userId)
        const user = await User.findById(userId).select("-password");
        // console.log("userFunction",user)
        return NextResponse.json({message:"User found succesfully",data:user})
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}