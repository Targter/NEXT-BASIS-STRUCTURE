"use client"
import React from 'react'
import axios from "axios"
import Link from 'next/link'
import {useRouter} from"next/navigation"
const ProfilePage = () => {
    const router = useRouter();
    const [data,setData] = React.useState("nothing")
    const logout = async ()=>{
        try{
            const response = await axios.get("api/users/logout")
            console.log("successfully logout")  
            router.push("/login")
        }
        catch(error:any){
            console.log("logOut error:",error.message)
        }
    }


    // find the userInfo through tokens:
    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/userinfo')
        console.log("responseINfo",res.data.data)
        setData(res.data.data._id)
    } 
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className='p-3 rounded bg-red-100 text-black'>{data ==="nothing"?"":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className='mt-5 bg-blue-50 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded'onClick={logout}>Logout</button>
        {/*  */}
        <button className='mt-5 bg-green-100 hover:bg-green-800 text-black font-bold py-2 px-4 rounded'onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}

export default ProfilePage