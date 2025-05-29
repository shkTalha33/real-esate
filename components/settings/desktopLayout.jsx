"use client";
import {
  AiOutlineProduct,
  AiOutlineUser,
  FaRegHeart,
  MdEmail,
  FaHouseChimney,
  FaLock,
  FaUser,
  IoMdRemoveCircle,
  IoAddCircle,
} from "@/public/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopSection from "../common/TopSection";
import { AcmeLogo } from "../navHeader";

export default function DesktopLayout({ children }) {
  const pathname = usePathname();

  const menuItemsDesktop = [
    {
      id: 1,
      name: "Profile",
      icon: <AiOutlineUser className="w-5 h-5" />,
      hasSubmenu: true,
      submenu: [
        {
          id: 11,
          name: "Account Details",
          path: "/settings/account-details",
          icon: <FaUser className="w-4 h-4" />,
        },
        // {
        //   id: 12,
        //   name: "Change Email",
        //   path: "/settings/change-email",
        //   icon: <MdEmail className="w-4 h-4" />,
        // },
        {
          id: 13,
          name: "Change Username",
          path: "/settings/change-username",
          icon: <FaUser className="w-4 h-4" />,
        },
        {
          id: 14,
          name: "Change Password",
          path: "/settings/change-password",
          icon: <FaLock className="w-4 h-4" />,
        },
        {
          id: 15,
          name: "Deactivate Account",
          path: "/settings/deactivate-account",
          icon: <IoMdRemoveCircle className="w-4 h-4" />,
        },
      ],
    },
    // {
    //   id: 2,
    //   name: "Favorites",
    //   icon: <FaRegHeart className="w-5 h-5" />,
    //   path: "/settings/favorites",
    //   hasSubmenu: false,
    // },
    {
      id: 3,
      name: "My Listings",
      icon: <AiOutlineProduct className="w-5 h-5" />,
      path: "/settings/my-listings",
      hasSubmenu: true,
      submenu: [
        {
          id: 16,
          name: "All Listings",
          path: "/settings/my-listings",
          icon: <FaHouseChimney className="w-4 h-4" />,
        },
        {
          id: 17,
          name: "Add Listing",
          path: "/settings/add-listing",
          icon: <IoAddCircle className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Check if current path matches direct menu item (only for items without submenu)
  const isMenuActive = (item) => {
    return !item.hasSubmenu && pathname === item.path;
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-custom">
      {/* Sidebar */}
      <aside
        className={`
      w-full sm:w-64 bg-brand-white dark:bg-brand-deepdark shadow-lg z-40
      flex flex-row sm:flex-col border-b sm:border-b-0 sm:border-r
      border-gray-200 dark:border-gray-700 
      sm:fixed sm:left-0 sm:top-0 sm:h-screen
      h-auto
    `}
      >
        {/* Logo Section */}
        <div className="p-4 w-full sm:p-6 flex items-center justify-center sm:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <AcmeLogo />
            <h1 className="text-lg sm:text-xl poppins_semibold">Real Estate</h1>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-x-auto sm:overflow-y-auto">
          <ul className="flex sm:flex-col flex-row sm:space-y-1 space-x-2 sm:space-x-0 p-2">
            {menuItemsDesktop.map((item) => (
              <li key={item.id}>
                {/* Parent Menu Item */}
                {item.hasSubmenu ? (
                  // Non-clickable parent with submenu
                  <div
                    className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg text-sm sm:text-base cursor-default ${
                      isMenuActive(item)
                        ? "bg-brand-dark/10 text-brand-dark dark:bg-brand-900/20 dark:text-brand-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline roboto_medium">
                      {item.name}
                    </span>
                  </div>
                ) : (
                  // Clickable parent without submenu
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg transition-colors text-sm sm:text-base ${
                      isMenuActive(item)
                        ? "bg-brand-dark text-brand-white dark:bg-brand-900/30 dark:text-brand-400 roboto_medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                )}

                {/* Submenu - Always visible if parent has submenu */}
                {item.hasSubmenu && (
                  <ul className="mt-1 ml-4 sm:ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            pathname === subItem.path
                              ? "bg-brand-dark text-brand-white dark:bg-brand-900/30 dark:text-brand-400 roboto_medium"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {subItem.icon}
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
      <main className="flex-1 overflow-auto bg-brand-white dark:bg-brand-deepdark sm:ml-64">
        <TopSection page="Settings" />
        {/* Content wrapper with top padding for fixed header */}
        <div className="pt-20 sm:pt-16">{children}</div>
      </main>
    </div>
  );
}
