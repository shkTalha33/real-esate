"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsHouseDoor, BsGear } from "react-icons/bs";
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  // Hide nav on auth pages (login, signup)
  const authPages = ["/login", "/signup"];
  if (authPages.includes(pathname)) {
    return null;
  }

  const navItems = [
    {
      name: "Home",
      icon: <BsHouseDoor className="w-6 h-6" />,
      path: "/",
    },
    {
      name: "Properties",
      icon: <HiOutlineBuildingOffice2 className="w-6 h-6" />,
      path: "/properties",
    },
    {
      name: "About",
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      path: "/about",
    },
    {
      name: "Contact",
      icon: <IoCallOutline className="w-6 h-6" />,
      path: "/contact",
    },
  ];

  // Add Settings only if user is logged in
  if (isLogin) {
    navItems.push({
      name: "Settings",
      icon: <BsGear className="w-6 h-6" />,
      path: "/settings",
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-deepdark border-t border-gray-200 dark:border-gray-700 z-50 sm:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              pathname === item.path
                ? "text-brand-warning"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {item.icon}
            <span className="text-sm mt-1 roboto_medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
