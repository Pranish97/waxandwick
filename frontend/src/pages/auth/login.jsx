import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast.success(data.payload.message)
      }else if(data?.payload?.error) {
        toast.error(data.payload.message)
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 font-playfarir">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-10 font-playfair">
          Login To Waxandwick{" "}
        </h1>

        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Login"}
          onSubmit={onSubmit}
        />

        <p className="mt-5 font-mons">
          New to Waxandwick?{" "}
          <Link
            to={"/auth/register"}
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
