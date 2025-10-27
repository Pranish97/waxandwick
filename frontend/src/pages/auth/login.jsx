import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonForm from '../../components/common/form'
import { loginFormControls } from '../../config'

const initialState ={
  email:"",
  password:""
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState)

  function onSubmit(){

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 font-playfarir">
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-foreground tracking-tight mb-10 font-playfair'>Login To Waxandwick </h1>

        <CommonForm 
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Login"}
        onSubmit={onSubmit}
        />

        <p className='mt-5 font-mons'>New to Waxandwick? <Link to={"/auth/register"}className="font-medium text-primary hover:underline">Register</Link> </p>
      </div>
      </div>
  )
}

export default AuthLogin