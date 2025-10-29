import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminUsers from "./pages/admin/users";
import NotFound from "./pages/not-found";
import UserLayout from "./components/user/layout";
import HomePage from "./pages/user/home";
import ProductPage from "./pages/user/products";
import AboutPage from "./pages/user/about";
import ContactPage from "./pages/user/contact";
import CheckAuth from "./components/common/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import LoadingPage from "./pages/loading/loading";

const App = () => {
  const {isAuthenticated, user, isLoading} = useSelector((state) => state.auth );
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <LoadingPage />
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="/" element={<CheckAuth>
          <UserLayout />
        </CheckAuth>}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
