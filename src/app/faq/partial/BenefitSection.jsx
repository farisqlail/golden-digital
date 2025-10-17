"use client"

import React from "react";
import { Typography } from "@material-tailwind/react";
import {
    RectangleGroupIcon,
    FingerPrintIcon,
    SwatchIcon,
    HashtagIcon,
    EyeIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { BenefitsCard } from "@/components";

const Benefits = [
    {
        icon: RectangleGroupIcon,
        title: "Murah",
        children:
            "Dapatkan kelebihan akses akun family dengan biaya yang jauh lebih terjangkau daripada langganan individual",
    },
    {
        icon: FingerPrintIcon,
        title: "Metode Pembayaran Terpercaya",
        children:
            "Kami bekerja sama dengan penyedia layanan pembayaran terkemuka, memberikan Anda jaminan keamanan dan kenyamanan dalam setiap transaksi yang Anda lakukan",
    },
    {
        icon: SwatchIcon,
        title: "Perlindungan Identitas",
        children:
            "Kami menerapkan langkah-langkah keamanan yang ketat untuk melindungi informasi pribadi Anda dari akses yang tidak sah atau penggunaan yang tidak diinginkan",
    },
    {
        icon: HashtagIcon,
        title: "Customer Service yang Siap Sedia",
        children:
            "Kami memahami pentingnya respon yang cepat. Tim customer service kami merespon dengan cepat setiap permintaan, memastikan bahwa Anda mendapatkan bantuan yang Anda butuhkan dengan segera.",
    },
    {
        icon: EyeIcon,
        title: "Beragam Pilihan",
        children:
            "Temukan beragam jenis konten, mulai dari streaming video, musik, hingga platform pembelajaran online, memberi Anda kesempatan untuk mengeksplorasi dan menikmati berbagai macam hiburan dan informasi"
    },
    {
        icon: EyeIcon,
        title: "Akun Resmi dan Legal",
        children:
            "Kami hanya menyediakan akses ke akun-akun resmi dan legal yang sepenuhnya sah, menjauhkan Anda dari risiko menggunakan akun ilegal yang dapat membahayakan pengalaman Anda"
    },
];

export default function BenefitSection() {
    return (
        <>
            <div className="py-8 px-8 bg-[#ba0c0c]">
                <div className="container mx-auto sm:mb-20 mb-0 text-center">
                    <h1
                        className="mb-2 font-bold uppercase text-white text-xl">
                        Teman Gabutmu
                    </h1>
                    <h1
                        color="white"
                        className="mb-4 text-white">
                        Keuntungan Berlangganan Di Teman Gabutmu
                    </h1>
                </div>
                <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 flex justify-center">
                    {Benefits.map((props, idx) => (
                        <BenefitsCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </>
    );
}