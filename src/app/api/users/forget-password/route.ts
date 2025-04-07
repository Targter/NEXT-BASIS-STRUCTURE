import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
connectDB();
export async function POST(request:NextRequest){
    try{
        // console.log("fpreouter")
        const reqBody = await request.json();
        const {email} = reqBody
        if(!email) return NextResponse.json({message:"Did not received Mail"})
        const user = await User.findOne({email})
        if(!user) return NextResponse.json({mesage:"User does not exist"})
        // console.log(user._id)
        const UserId =user._id
        await sendEmail({email,emailType:"RESET",userId:UserId})

        return NextResponse.json({message:"Email Send Successfully:Check your mail to update the password"})
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}