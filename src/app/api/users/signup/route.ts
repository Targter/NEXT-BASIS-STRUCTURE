// singup route: 
import { connectDB } from "@/dbConfig/dbConfig";
// have to give the file name: 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
console.log("called backend")
// only connect the database first: 
connectDB();

export async function POST(request: NextRequest) {
    try {
    console.log("called this")
    const reqBody = await request.json();
    // it is not body.json(); not body.json;
    const { username, email, password } =reqBody;
    // console.log("reqBody",request.json());
    // check if the user already exists:
    const user = await User
      .findOne({ email })
    // console.log("user:",user)
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    // hash the password:
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    // create a new user:
    const newUser = new User({username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // console.log("savedUser:",savedUser);
    // send verification email 
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
    // return the response:
    return NextResponse.json({ message: "User created",success:true,savedUser });
    } catch (error:any) {
    return NextResponse.json({ message: "Server error",error:error.message }, { status: 500 });
    }
}