"use client";

import React from "react";
import { User, Receipt, TicketPercent, Store, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    const handleRoute = (params) => {
        router.push(params)
    }

    const comingSoon = () => {
        router.push("/comingsoon")
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 w-full md:max-w-sm h-fit">
            <div className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleRoute("/profile")}
            >
                <User size={20} className="text-red-500" />
                <span className="text-sm md:text-base">Profile</span>
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleRoute("/profile/vouchers")}
            >
                <Receipt size={20} className="text-red-500" />
                <span className="text-sm md:text-base">Claim Voucher</span>
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleRoute("/profile/history")}
            >
                <TicketPercent size={20} className="text-red-500" />
                <span className="text-sm md:text-base">Pesanan</span>
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={comingSoon}
            >
                <Store size={20} className="text-red-500" />
                <span className="text-sm md:text-base">Reseller</span>
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={logout}
            >
                <LogOut size={20} className="text-red-500" />
                <span className="text-sm md:text-base">Keluar</span>
            </div>
        </div>
    );
}
