"use client";
import {
  AiOutlineUser,
  AiOutlineProduct,
  FaRegHeart,
} from "@/public/assets/icons";
import Link from "next/link";
import { useState } from "react";
import TopSection from "../common/TopSection";
import { AcmeLogo } from "../navHeader";

export default function DesktopLayout({ children }) {
  const [activeTab, setActiveTab] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const menuItemsDesktop = [
    {
      id: 1,
      name: "Profile",
      icon: <AiOutlineUser className="w-5 h-5" />,
      path: "/settings",
      hasSubmenu: true,
      submenu: [
        {
          id: 11,
          name: "Account Details",
          path: "/settings/account-details",
        },
        {
          id: 12,
          name: "Change Email",
          path: "/settings/change-email",
        },
        {
          id: 13,
          name: "Change Username",
          path: "/settings/change-username",
        },
        {
          id: 14,
          name: "Change Password",
          path: "/settings/change-password",
        },
        {
          id: 15,
          name: "Deactivate Account",
          path: "/settings/deactivate-account",
        },
      ],
    },
    {
      id: 2,
      name: "Favorites",
      icon: <FaRegHeart className="w-5 h-5" />,
      path: "/settings/favorites",
    },
    {
      id: 3,
      name: "My Listings",
      icon: <AiOutlineProduct className="w-5 h-5" />,
      path: "/settings/listings",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-custom">
      {/* Sidebar */}
      <aside
        className={`
          w-full sm:w-64 bg-brand-white dark:bg-brand-deepdark shadow-lg z-40
          flex flex-row sm:flex-col border-b sm:border-b-0 sm:border-r
          border-gray-200 dark:border-gray-700
        `}
      >
        {/* Logo Section */}
        <div className="p-4 w-full sm:p-6 flex items-center justify-center sm:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <AcmeLogo />
            <h1 className="text-lg sm:text-xl poppins_semibold">Estate Loop</h1>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-x-auto sm:overflow-y-auto">
          <ul className="flex sm:flex-col flex-row sm:space-y-1 space-x-2 sm:space-x-0 p-2">
            {menuItemsDesktop.map((item) => (
              <li key={item.id}>
                {/* Main Menu Item */}
                <Link
                  href={item.path}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === item.id && !item.hasSubmenu
                      ? "bg-brand-dark text-brand-white dark:bg-brand-900/30 dark:text-brand-400 roboto_medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  } ${item.className || ""}`}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>

                {/* Submenu */}
                {item.hasSubmenu && activeTab === item.id && (
                  <ul className="mt-1 ml-4 sm:ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.path}
                          onClick={() => setActiveSubTab(subItem.id)}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            activeSubTab === subItem.id
                              ? "bg-brand-dark text-brand-white dark:bg-brand-900/30 dark:text-brand-400 roboto_medium"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="hidden sm:inline">
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-brand-white dark:bg-brand-deepdark">
        <TopSection page="Settings" />
        {children}
      </main>
    </div>
  );
}
