import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'

const AdminHeader = ({setOpen}) => {
  return (
    <header className='flex justify-between items-center py-4 px-4 bg-background border-b'>
      <Button onClick={() =>setOpen(true)} className="lg:hidden sm:block cursor-pointer bg-pink-500 hover:bg-pink-600" >
        <Menu />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button className="cursor-pointer bg-pink-500 hover:bg-pink-600">
          <LogOut />
          Logout
        </Button>
      </div>

    </header>
  )
}

export default AdminHeader