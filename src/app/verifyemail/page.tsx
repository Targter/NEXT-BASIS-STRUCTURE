"use client"

import axios from "axios"
import Link from "next/link"
import React,{useEffect,useState} from "react"


export default function VerifyEmailPage (){
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false)

    const verifyUserEmail = async()=>{
        try{
            console.log("tokeN",token)
            const response  = await axios.post("/api/users/verifyemail",{token})
            console.log(response)
            setVerified(true)  
    }
        catch(error:any){
            console.log("error:",error.message)
        }
    }
    useEffect(()=>{
        const urlTokens= window.location.search.split("=")[1]
        console.log('window:',window.location)
        setToken(urlTokens || "")
    },[])
    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])


    return <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-600 text-black">{token?`${token}`:"No token"}</h2>


        {verified && (<div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/login">Login</Link>
        </div>)}

        {error && (<div>
        <h2 className="text-2xl text-black bg-red-600">Error</h2>
        </div>)}
        </div>

    </>
}
