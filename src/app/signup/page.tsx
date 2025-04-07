"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import Link from "next/link";
export default function SignupPage() {
const router = useRouter();

const [user,setUser] = useState({
  username: "",
  email: "",
  password: ""
});
const [buttonDisabled, setbuttonDisabled] = useState(false);
const [loading,setLoading] = useState(false)

const onSingup = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try{
    setLoading(true)
    console.log("called")
    console.log("user:",user)
    const response = await axios.post("/api/users/signup",user);
    console.log("sing up success",response.data)
    router.push("/login")
  }
  catch(error:any){
    console.log("error api:",error.message)
  }
  finally{
    setLoading(false)
  }
  // setbuttonDisabled(true);  
}

useEffect(() => {
  if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    setbuttonDisabled(false);
  }
  else {
    setbuttonDisabled(true);
  }
  }, [user]);

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl">
          <h1 className="text-2xl font-semibold text-center text-gray-800">{loading?"Processing":"Sing up"}</h1>
          <h2 className="text-2xl font-semibold text-center text-gray-800">Create an Account</h2>
          <form className="mt-6" onSubmit={onSingup}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input 
                type="text" 
                className="w-full mt-1 p-3 border rounded-lg text-black focus:ring focus:ring-blue-300" 
                placeholder="Enter your full name"
                required
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
              />
            </div>
  
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input 
                type="email" 
                className="w-full mt-1 p-3 border rounded-lg text-black focus:ring focus:ring-blue-300" 
                placeholder="Enter your email"
                required
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
              />
            </div>
  
            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input 
                type="password" 
                className="w-full mt-1 p-3 border rounded-lg text-black focus:ring focus:ring-blue-300" 
                placeholder="Create a password"
                required
                
                value={user.password}
                onChange={e => setUser({...user, password: e.target.value})}
              />
            </div>
  
  
            {/* Signup Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={buttonDisabled}
            >
              {buttonDisabled?"No Sing up":"Sing up"}
            </button>
          </form>
  
          {/* Login Redirect */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    );
  }
  