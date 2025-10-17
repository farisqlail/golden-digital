"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SubscribeSection() {
    const steps = [
        {
            id: 1,
            title: "Pilih Produk Layanan",
            description: "Langkah pertama pilih produk layanan yang paling sesuai dengan kebutuhanmu untuk mulai berlangganan.",
        },
        {
            id: 2,
            title: "Lakukan Pembayaran",
            description: "Setelah itu, lakukan pembayaran dengan metode pembayaran yang sudah kami sediakan, mudah dan praktis!",
        },
        {
            id: 3,
            title: "Konfirmasi Admin",
            description: "Begitu pembayaran selesai, kamu dapat memilih wa admin untuk melakukan klaim akun yang sudah kamu beli.",
        },
        {
            id: 4,
            title: "Akun Siap Digunakan",
            description: "Setelah konfirmasi berhasil, akun kamu akan dikirimkan lewat Whatsapp oleh admin dan siap digunakan.",
        },
    ];

    return (
        <section className="py-8 px-8 mb-20 text-white">
            <div className="container mx-auto text-center">
                <h1 className="mb-12 font-bold uppercase text-white text-2xl">
                    Cara Berlangganan
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="bg-white p-6 rounded-lg flex gap-4">
                            <span className="bg-[#ba0c0c] pl-4 pr-4 pt-2 pb-2 rounded-full h-fit text-amber-500 font-semibold">{step.id}</span>
                            <div className="flex flex-col text-left">
                                <h2 className="text-2xl font-semibold mb-2 text-[#ba0c0c]">{step.title}</h2>
                                <p className="text-black">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-left bg-white p-4 rounded-lg">
                    <h1 className="uppercase text-[#ba0c0c] font-bold text-3xl">Hati-hati dengan modus penipuan!</h1>
                    <p className="text-black mt-3">
                       Sebelum melakukan transaksi pastikan <span className="uppercase text-green-500 font-semibold">Nomor Whatsapp admin</span> adalah benar dari <span className="uppercase text-[#ba0c0c] font-semibold">Teman Gabutmu</span>
                    </p>
                </div>
            </div>
        </section>
    );
}  
