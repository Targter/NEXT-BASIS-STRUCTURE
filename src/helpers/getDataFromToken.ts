import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request:NextRequest)=>{
    try{
        const token = request.cookies.get("token")?.value || ""
        const decodedToken :any= jwt.verify(token,process.env.JWT_SECRET_KEY!)
        // this will return the id of the 
        console.log("decodedId",decodedToken.id)
        return decodedToken.id;
    }
    catch(error:any){
        throw new Error(error.message)
    }
}