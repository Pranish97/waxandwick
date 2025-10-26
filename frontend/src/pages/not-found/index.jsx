import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-white text-center relative overflow-hidden">
      <h1 className="text-[150px] font-extrabold text-pink-400 relative select-none">
        404
        <span className="absolute inset-0 text-pink-300 blur-lg opacity-50">404</span>
      </h1>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-3 h-3 bg-blue-300 rounded-full absolute top-[-80px] left-[-100px] animate-ping" />
        <div className="w-4 h-4 bg-yellow-300 rounded-full absolute top-[-100px] right-[-120px] animate-pulse" />
        <div className="w-3 h-3 bg-green-300 rounded-full absolute bottom-[-90px] left-[-90px]" />
      </div>

      <div className="w-32 h-6 bg-pink-200 rounded-full blur-lg opacity-50 mt-[-40px]" />

      <p className="text-2xl font-semibold text-pink-400 mt-4 mb-8 font-playfair">
        Page Not Found
      </p>

    
      <button
        onClick={() => navigate("/")}
        className="bg-pink-400 text-white px-6 py-3 rounded-2xl text-lg font-medium shadow-lg hover:bg-pink-500 hover:shadow-xl transition-all duration-300 font-mons cursor-pointer"
      >
        Return Home
      </button>
    </div>
  )
}

export default NotFound