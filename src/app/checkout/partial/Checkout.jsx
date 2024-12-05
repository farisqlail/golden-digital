"use client";

import React from "react";
import Image from "next/image";

import { Button, Typography } from "@material-tailwind/react";

export function Checkout() {
    return (
        <section className="py-0 px-4">
            <div className="container mx-auto text-center flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] mt-4">
                    <div className="flex w-full">
                        <span className="font-semibold text-xl text-left">Detail Pesanan</span>
                    </div>
                    <div className="border-2 rounded-lg p-3 w-full">
                        <div className="border-b-2 pb-2">
                            <Image
                                width={1024}
                                height={800}
                                alt="product"
                                src={`/logos/spotify.png`}
                                className="h-full rounded-lg max-w-full"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-left">Spotify</span>
                                <span>Rp 69.800 / (2 Bulan)</span>
                            </div>
                            <Button className="bg-amber-600 w-full md:w-auto">Ubah Durasi</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
                        <div className="border-2 rounded-lg p-4">OVO</div>
                        <div className="border-2 rounded-lg p-4">QRIS</div>
                        <div className="border-2 rounded-lg p-4">DANA</div>
                        <div className="border-2 rounded-lg p-4">GOPAY</div>
                        <div className="border-2 rounded-lg p-4">SHOPEEPAY</div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-semibold text-xl text-left">Ringkasan Pembayaran</span>
                        <div className="border-b-2 pb-3 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span>Biaya Langganan</span>
                                <span>Rp 69.800</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biaya Transaksi & Tax</span>
                                <span>Rp 1.000</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-xl font-bold text-amber-600">Rp 70.800</span>
                        </div>
                        <Button className="bg-amber-600 w-full mt-3">Bayar</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
