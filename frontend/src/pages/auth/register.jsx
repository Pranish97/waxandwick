import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../store/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast.success(data.payload.message);
      } else if (data?.payload?.error) {
        toast.error(data?.payload.message);
      }
    });
  }

  console.log(formData);
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
