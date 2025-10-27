import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";

const initialState ={
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: ""
}

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState)

  function onSubmit(){

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
     <div className="text-center">
       <h1 className="text-4xl font-bold text-foreground tracking-tight mb-10 font-playfair">
        Create New Account
      </h1>

      <CommonForm
      formControls={registerFormControls}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText={"Register"}
      />

      <p className="mt-5 font-mons">
        Already Have Account?{" "}
        <Link
          className="font-medium text-primary hover:underline"
          to={"/auth/login"}
        >
          Login
        </Link>
      </p>
     </div>
    </div>
  );
};

export default AuthRegister;
