"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  {
    name: "Benefit",
    icon: UserCircleIcon,
  },
  {
    name: "Produk",
    icon: RectangleStackIcon,
  },
  {
    name: "Cara Berlangganan",
    icon: CommandLineIcon,
  },
];

function NavItem({ children, href }) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

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

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Image width={1024} height={800} src={`/logos/logo.png`}
          className="h-full rounded-lg max-w-28" />
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
            {NAV_MENU.map(({ name, href }) => (
              <NavItem key={name} href={href}>
                {name}
              </NavItem>
            ))}
          </ul>
          <a href="#" target="_blank">
            <Button className="bg-amber-500">Langganan</Button>
          </a>
        </div>
      </div>
      <Collapse open={open} className="lg:hidden">
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon }) => (
              <NavItem key={name}>
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
            <a href="#" target="_blank">
              <Button className="bg-amber-500">Langganan</Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
