"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LogoSection() {
    return (
        <>
            <div className="py-8 px-8 flex justify-center items-center bg-[#dedede]">
                <Image
                    width={1024}
                    height={800}
                    alt="product"
                    src="/favicon.png"
                    className="h-full rounded-lg w-40"
                />
            </div>
        </>
    );
}
