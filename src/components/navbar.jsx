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
  { name: "Home", id: "home" },
  { name: "Produk", id: "catalog" },
  { name: "Top Up", id: "coming-soon" }, // Ubah id untuk Top Up    
  { name: "Social Media", id: "coming-soon" }, // Ubah id untuk Social Media    
  { name: "FAQ", id: "faq" },
];

function NavItem({ children, id, onClick }) {
  return (
    <li>
      <Typography
        as="button"
        variant="paragraph"
        color="white" // Ubah warna teks menjadi putih  
        className="flex items-center gap-2 font-medium cursor-pointer"
        onClick={onClick}
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
  const [scrolling, setScrolling] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleNavigation = (id) => {
    if (id === "coming-soon") {
      router.push("/comingsoon");
    } else if (id == "catalog") {
      router.push("/catalog");
    } else if (id == "faq") {
      router.push("/faq");
    } else {
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
    }
  };

  const handleNavigationRoute = (url) => {
    router.push(url);
  }

  return (
    <MTNavbar shadow={false} fullWidth className={`border-0 sticky top-0 z-50 ${scrolling ? "bg-[#232323]" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div onClick={() => handleNavigation("/")} className="cursor-pointer">
          <Image
            width={1024}
            height={800}
            src={`/logos/logo-primary.png`}
            className="h-full rounded-lg max-w-22"
          />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="ml-auto h-6 w-6 text-white lg:hidden"
          onClick={handleOpen}
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </IconButton>
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="ml-10 mr-5 hidden items-center gap-8 lg:flex">
            {NAV_MENU.map(({ name, id }) => (
              <NavItem key={name} id={id} onClick={() => handleNavigation(id)}>
                {name}
              </NavItem>
            ))}
          </ul>
          {authToken ? (
            <div
              className="flex items-center justify-center w-10 h-10 bg-[#ba0c0c] rounded-full cursor-pointer"
              onClick={() => handleNavigationRoute("/profile")}
            >
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div onClick={() => handleNavigationRoute("/auth/login")}>
              <Button className="bg-[#ba0c0c]">Langganan</Button>
            </div>
          )}
        </div>
      </div>
      <Collapse open={open} className="lg:hidden">
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, id }) => (
              <NavItem key={name} id={id} onClick={() => handleNavigation(id)}>
                {name}
              </NavItem>
            ))}
          </ul>
          {authToken ? (
            <div
              className="flex items-center justify-center w-10 h-10 bg-[#ba0c0c] rounded-full cursor-pointer mt-3"
              onClick={() => handleNavigationRoute("/profile")}
            >
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="mt-3" onClick={() => handleNavigationRoute("/auth/login")}>
              <Button className="bg-[#ba0c0c]">Langganan</Button>
            </div>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;    
