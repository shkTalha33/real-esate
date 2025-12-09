"use client";
import { FaArrowRightLong, FaUser } from "@/public/assets/icons";
import NavHeader from "@/components/navHeader";
import { useRouter } from "next/navigation";
import {
  MdEmail,
  FaLock,
  IoMdRemoveCircle,
  FaHouseChimney,
  IoAddCircle,
} from "@/public/assets/icons";

const MobileLayout = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "Account Details",
      icon: <FaUser />,
      path: "/settings/account-details",
    },
    {
      title: "Change Username",
      icon: <FaUser />,
      path: "/settings/change-username",
    },
    {
      title: "Change Password",
      icon: <FaLock />,
      path: "/settings/change-password",
    },
    {
      title: "Deactivate Account",
      icon: <IoMdRemoveCircle />,
      path: "/settings/deactivate-account",
    },
    {
      title: "My Listings",
      icon: <FaHouseChimney />,
      path: "/settings/my-listings",
    },
    {
      title: "Add Listing",
      icon: <IoAddCircle />,
      path: "/settings/add-listing",
    },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <NavHeader />
      <div className="dark:bg-brand-deepdark text-gray-900 dark:text-gray-100 p-4 mt-20">
        <div className=" mx-auto space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="bg-brand-light dark:bg-brand-dark border-[0.5px] border-gray-100 dark:border-gray-600 flex items-center justify-between px-12 py-5 rounded-lg shadow-medium cursor-pointer hover:shadow-large transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl text-brand-muted dark:text-brand-white">
                  {item.icon}
                </span>
                <span className="roboto_medium dark:text-brand-white">
                  {item.title}
                </span>
              </div>
              <FaArrowRightLong className="dark:text-brand-white text-brand-black" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileLayout;
