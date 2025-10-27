import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/login.png";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex justify-center items-center w-1/2 h-screen">
        <img
          src={backgroundImage}
          alt="Login background"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="flex flex-1 justify-center items-center min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
