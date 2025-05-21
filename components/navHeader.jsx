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
import { BsMoonStarsFill, IoMdSunny } from "@/public/assets/icons/index";
import { setLogout } from "@/redux/slices/loginSlice";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const { theme, setTheme } = useTheme();
  console.log("theme", theme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    dispatch(setLogout());
    router.push("/login");
  };

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Mortgage Calculator", href: "/mortgage-calculator" },
    { name: "Settings", href: "/settings" },
    { name: "Logout", href: "/logout" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
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
            Estate Loop
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
        <NavbarItem>
          <Link color="foreground" href="/mortgage-calculator">
            Mortgage
          </Link>
        </NavbarItem>
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="gap-2"
                onClick={() => router.push("/profile")}
              >
                Profile
              </DropdownItem>
              <DropdownItem key="settings">Favorites</DropdownItem>
              <DropdownItem key="team_settings"> My Properties</DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
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
  );
}
