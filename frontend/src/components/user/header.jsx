import { useState } from "react";
import { ShoppingCart, Heart, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { toast } from "react-toastify";

export default function UserNavbar() {
  const [cartCount] = useState(1);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinks = [
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      toast.success(data?.payload?.message);
      navigate("/auth/login");
    });
  }

  return (
    <header className="w-full bg-[#F9E4DC] py-4 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center justify-center text-center gap-2">
        <div
          className="text-xl justify-center font-bold text-pink-500 font-merri cursor-pointer hover:scale-105"
          onClick={() => navigate("/home")}
        >
          Wax And{" "}
          <span className="block font-semibold text-sm font-mons">Wink</span>
        </div>
      </div>

      <nav className="hidden md:flex  items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className="text-pink-500 font-medium text-lg font-mons hover:text-pink-600 transition-colors hover:scale-105"
          >
            {link.label}
          </Link>
        ))}

        <div className="flex items-center gap-6">
          {user && isAuthenticated ? (
            <Link className="flex items-center gap-1 text-pink-500 font-mons font-medium text-lg hover:text-pink-600 hover:scale-105">
              <User />
              {user?.firstName}
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="text-pink-500 font-mons font-medium text-lg hover:text-pink-600 hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 text-pink-500">
          <Link>
            <FaFacebook className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
          </Link>
          <Link>
            <FaInstagram className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
          </Link>
        </div>

        <div className="flex gap-4 relative cursor-pointer text-pink-500">
          <Heart className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
          <ShoppingCart className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </div>

        <div className="flex">
          {user && isAuthenticated ? (
            <Button
              onClick={handleLogout}
              className="bg-pink-600 hover:bg-pink-500 cursor-pointer font-mons"
            >
              Logout
            </Button>
          ) : null}
        </div>
      </nav>

      <div className="flex md:hidden justify-end">
        <Button
          className="bg-pink-600 hover:bg-pink-500 cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <Menu />
        </Button>
      </div>

      <Sheet open={openMenu} onOpenChange={setOpenMenu}>
        <SheetContent>
          <div className="flex flex-col w-full items-center mt-20 gap-4">
            {navLinks.map((link) => (
              <Link
                onClick={() => setOpenMenu(false)}
                key={link.label}
                to={link.path}
                className="text-pink-500 text-lg font-medium font-mons hover:text-pink-600 transition-colors hover:scale-105"
              >
                {link.label}
              </Link>
            ))}

            {user && isAuthenticated ? (
              <Link className="flex items-center gap-1 text-pink-500 font-mons font-medium text-lg hover:text-pink-600 hover:scale-105">
                <User />
                {user?.firstName}
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="text-pink-500 font-mons font-medium text-lg hover:text-pink-600 hover:scale-105"
              >
                Login
              </Link>
            )}

            <div className="flex gap-4 mt-4 text-pink-500">
              <Link>
                <FaFacebook className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
              </Link>
            </div>

            <div className="flex gap-4 mt-4 text-pink-500 cursor-pointer">
              <Heart className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
              <ShoppingCart className="w-6 h-6 hover:text-pink-600 hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </div>

            <div className="flex">
              {user && isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="bg-pink-600 hover:bg-pink-500 cursor-pointer font-mons"
                >
                  Logout
                </Button>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
