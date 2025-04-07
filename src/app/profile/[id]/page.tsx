"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const UserProfile = () => {
    const router = useRouter()
    console.log('router',router)
  return (
    <div>Hello , from User Profile Page</div>
  )
}

export default UserProfile