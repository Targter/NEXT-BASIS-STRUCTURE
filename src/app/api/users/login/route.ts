// 
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
connectDB()

export async function POST( request:NextRequest){
    try{
        const reqBody =await request.json()
        const {email,password} = reqBody; 
        console.log("email:",email,"password:",password)
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        // check is password is correct
        const validatePassword = await bcryptjs.compare(password,user.password)
        if(!validatePassword) {
            return NextResponse.json({error:"Invalid user password"},{status :404})
        }

        // send cookies to the user: or verify the user: 
        // create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})
        // console.log("tokenData while login:",token)
        const response = NextResponse.json({message:"Login successfull",success:true})
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    }
    catch(error:any){
        // console.log("error while Login :",error.message)
        return NextResponse.json({error:error.message})
    }
}