"use client";
import { FaArrowRightLong, FaUser } from "@/public/assets/icons";
import NavHeader from "@/components/navHeader";
const MobileLayout = () => {
  const menuItems = [
    {
      title: "Profile",
      icon: <FaUser />,
    },
    {
      title: "Change Email",
      icon: <FaUser />,
    },
    {
      title: "Change Password",
      icon: <FaUser />,
    },
    {
      title: "Change Username",
      icon: <FaUser />,
    },
  ];
  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-brand-deepdark text-gray-900 dark:text-gray-100 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-brand-dark flex items-center justify-between px-12 py-5 rounded-lg shadow-medium cursor-pointer hover:shadow-large transition-shadow"
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
