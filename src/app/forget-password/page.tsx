"use client"
import React from 'react'
import axios from 'axios'
const ForgetPassword = () => {
    const [mail,setMail] = React.useState('')

    const ForgotPassword =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("called-fp")
        if(!mail) return 
        const response = await axios.post("/api/users/forget-password",{email:mail})
        console.log(response)
        setMail('')
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Reset Password</h2>
        <form onSubmit={ForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">ENTER USER-MAIL</label>
            <input
              type="email"
              placeholder="Enter mail"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={mail}
              onChange={(e)=>setMail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword