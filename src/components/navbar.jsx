"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const NAV_MENU = [
  { name: "Benefit", id: "benefits" },
  { name: "Produk", id: "products" },
  { name: "Cara Berlangganan", id: "subscribe" },
  { name: "FAQ", id: "faq" },
];

function NavItem({ children, id }) {
  const handleClick = () => {
    const target = document.getElementById(id);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      console.error(`Target with id '${id}' not found.`);
    }
  };

  return (
    <li>
      <Typography
        as="button"
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer"
        onClick={handleClick}
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div onClick={() => handleNavigation("/")} className="cursor-pointer">
          <Image
            width={1024}
            height={800}
            src={`/logos/logo.png`}
            className="h-full rounded-lg max-w-28"
          />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="ml-auto h-6 w-6 text-gray-800 lg:hidden"
          onClick={handleOpen}
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </IconButton>
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="ml-10 mr-5 hidden items-center gap-8 lg:flex">
            {NAV_MENU.map(({ name, id }) => (
              <NavItem key={name} id={id}>
                {name}
              </NavItem>
            ))}
          </ul>
          {authToken ? (
            <div
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => handleNavigation("/profile")}
            >
              <UserCircleIcon className="w-6 h-6 text-gray-600" />
            </div>
          ) : (
            <div onClick={() => handleNavigation("/auth/login")}>
              <Button className="bg-amber-500">Langganan</Button>
            </div>
          )}
        </div>
      </div>
      <Collapse open={open} className="lg:hidden">
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, id }) => (
              <NavItem key={name} id={id}>
                {name}
              </NavItem>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
