"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@/components/ui";
import {
  BsMoonStarsFill,
  HiOutlineUser,
  IoMdSunny,
  IoMdSettings,
  MdOutlineLogout,
  FaUser,
} from "@/public/assets/icons/index";
import { setLogout, setUserData } from "@/redux/slices/loginSlice";
import debounce from "debounce";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./api/apiEndpoints";
import ApiFunction from "./api/apiFunction";
import { handleError } from "./api/errorHandler";
import Cookies from "js-cookie";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.auth.userData);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const { theme, setTheme } = useTheme();
  const [showTranslate, setShowTranslate] = useState(false);
  const translateRef = useRef(null);
  const { get } = ApiFunction();

  // Custom scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 10);

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setShowNavbar(false);
      } else {
        // Scrolling up or at top
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll event for better performance
    const throttledHandleScroll = debounce(handleScroll, 5);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    dispatch(setLogout());
    router.push("/login");
  };

  const getCurrentUser = debounce(async () => {
    // Only fetch user data if user is already logged in
    const token =
      Cookies.get("estate_loop_token") ||
      localStorage.getItem("estate_loop_token");
    if (!token) {
      return; // Don't make API call if no token exists
    }

    await get(currentUser)
      .then((res) => {
        if (res?.success) {
          dispatch(setUserData(res?.data));
        }
      })
      .catch((err) => {
        // Only logout if we had a token (user was logged in)
        // This prevents logging out users who are just browsing
        if (token) {
          dispatch(setLogout());
        }
      });
  }, 300);

  // Handle click outside to close translate widget
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        translateRef.current &&
        !translateRef.current.contains(event.target)
      ) {
        const clickedOnGlobeIcon = event.target.closest(
          "button, .goog-te-menu-value"
        );
        if (!clickedOnGlobeIcon) {
          setShowTranslate(false);
        }
      }
    }

    if (showTranslate) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTranslate]);

  useEffect(() => {
    // Only fetch user data if user is logged in
    if (isLogin) {
      getCurrentUser();
    }
    setIsActive(pathname);
  }, [pathname, isLogin]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Mortgage Calculator", href: "/mortgage-calculator" },
    { name: "Settings", href: "/settings/account-details" },
    { name: "Logout", href: "/logout" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];

  return (
    <div className="!lg:container lg:mx-auto navheader">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`!w-full bg-brand-white dark:bg-brand-deepdark fixed top-0 z-50 transition-all duration-500 ease-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "backdrop-blur-md bg-brand-white/80 dark:bg-brand-deepdark/80 shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-brand-white dark:bg-brand-deepdark"
        }`}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <Link
              href={"/"}
              className="poppins_semibold text-inherit cursor-pointer"
            >
              Real Estate
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive === "/properties"}>
            <Link aria-current="page" href="/properties">
              Properties
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive === "/about"}>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive === "/contact"}>
            <Link color="foreground" href="/contact">
              Contact
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link color="foreground" href="/mortgage-calculator">
              Mortgage
            </Link>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="text-default-500 hover:text-foreground"
            >
              {theme === "dark" ? (
                <IoMdSunny size={20} />
              ) : (
                <BsMoonStarsFill size={20} />
              )}
            </Button>
          </NavbarItem>
          {!isLogin ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  className="bg-brand-primary hover:bg-brand-primary/80 text-brand-white"
                  href="/signup"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={
                    user?.avatar ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  startContent={<FaUser size={17} />}
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  className="gap-2"
                  startContent={<IoMdSettings size={17} />}
                  onClick={() => router.push("/settings/account-details")}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  onClick={handleLogout}
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<MdOutlineLogout size={17} />}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* Add padding to body to compensate for fixed navbar */}
      <div className="pt-16"></div>
    </div>
  );
}
