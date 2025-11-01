import {
  LayoutDashboard,
  Package,
  ShieldUser,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart />,
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: <Users />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="mt-10 flex-col flex gap-2 font-mons">
      {adminSideBarMenuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen(false)
            }}
            className={`flex text-base items-center gap-4 font-medium cursor-pointer rounded-md px-4 py-4 
              ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "hover:bg-pink-500 hover:text-white"
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 px-3 py-2 font-mons">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 items-center">
                <ShieldUser size={30} /> Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[260px] flex-col border-b bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ShieldUser size={40} />
          <h1 className=" text-2xl font-bold font-mons"> Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
