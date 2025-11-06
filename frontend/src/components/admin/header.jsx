import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout(){
    dispatch(logoutUser()).then(data => {
      if(data?.payload?.success){
        toast.success(data.payload.message)
        navigate("/auth/login")
      }
    })
  }
  
  return (
    <header className='flex justify-between items-center py-4 px-4 bg-background border-b'>
      <Button onClick={() =>setOpen(true)} className="lg:hidden sm:block cursor-pointer bg-pink-500 hover:bg-pink-600" >
        <Menu />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className="cursor-pointer bg-pink-500 hover:bg-pink-600">
          <LogOut />
          Logout
        </Button>
      </div>

    </header>
  )
}

export default AdminHeader