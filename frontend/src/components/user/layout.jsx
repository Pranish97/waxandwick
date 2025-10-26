import React from 'react'
import { Outlet } from 'react-router-dom'
import Userheader from './header'

const UserLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <Userheader/>
        <main className='flex flex-col w-full'>
            <Outlet />
        </main>
    </div>
  )
}

export default UserLayout