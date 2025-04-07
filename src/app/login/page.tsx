"use client"
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function LoginForm() {
  const router = useRouter();
  const [user,setUser] = React.useState({email:"",password:""})
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading,setLoading] = React.useState(false)
  const onLogin = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      console.log("login called")
      setLoading(true)
      const response =  await axios.post("/api/users/login",user);
      console.log("login success",response.data)
      router.push("/profile")
    }
    catch(error:any){
      console.log("login failed",error.message)
    }
    finally{
      setLoading(false)
    }
  }

  // validation check wheather user is calling without the values:
  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    }
    else {
      setbuttonDisabled(true);
    }
    }, [user]);
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-semibold text-center text-gray-800">{loading?"Processing":"Login"}</h1>
          <form className="mt-6" onSubmit={onLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input 
                type="email" 
                className="w-full mt-1 p-3 border rounded-lg text-black focus:ring focus:ring-blue-300 " 
                placeholder="Enter your email"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input 
                type="password" 
                className="w-full mt-1 p-3 border rounded-lg focus:ring text-black focus:ring-blue-300" 
                placeholder="Enter your password"
                required
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3  rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={buttonDisabled}
              >
                {buttonDisabled?"No login up":"Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Did not remember the password? <Link href="/forget-password" className="text-blue-600 hover:underline">forget-Password</Link>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
  