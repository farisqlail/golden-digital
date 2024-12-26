"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    Card,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Radio,
    Button,
    Typography
} from "@material-tailwind/react";

import {
    getResource,
} from "../../../../../utils/Fetch";

export function Detail({ productData }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState("informasi");
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("promo");
                setPromo(Array.isArray(result.promo) ? result.promo : []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const toCheckout = () => {
        router.push("/checkout")
    }

    const data = [
        {
            label: "Informasi",
            value: "informasi",
            desc: `Akun premium memberi Anda akses lebih banyak fitur dan kenyamanan. Dengan berlangganan akun premium, Anda dapat menikmati pengalaman tanpa gangguan, mendapatkan akses eksklusif ke konten, dan menikmati fitur tambahan yang tidak tersedia untuk pengguna biasa. Baik untuk menonton, mendengarkan, atau mengelola akun Anda, berlangganan premium memberikan pengalaman yang lebih kaya dan lebih cepat.`
        },
        {
            label: "Skema Berlangganan",
            value: "skema",
            desc: `Pilih paket yang sesuai dengan kebutuhan Anda! Akun premium hadir dengan beberapa pilihan skema berlangganan: Paket Bulanan yang memungkinkan Anda menikmati akses premium dengan biaya bulanan yang terjangkau, Paket Tahunan yang memberikan diskon lebih besar dengan berlangganan untuk setahun penuh, dan Paket Keluarga yang menyediakan akses premium untuk beberapa akun dalam satu keluarga dengan harga yang lebih hemat. Setiap paket menawarkan berbagai keuntungan seperti bebas iklan, kualitas streaming lebih tinggi, dan akses eksklusif ke konten tertentu.`
        },
    ];

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto text-left">
                <Typography variant="h2" color="blue-gray" className="mb-4">
                    {productData ? `Langganan ${productData?.product?.variance?.variance_name}` : <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>}
                </Typography>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Kiri */}
                    <div className="flex-[3] flex flex-col gap-4">
                        <div className="max-w-[18rem] mx-auto lg:mx-0 mt-5 border-2 rounded-lg p-2">
                            {productData?.product?.variance?.variance_name ? (
                                <Image
                                    width={1024}
                                    height={800}
                                    alt="product"
                                    src={`/logos/${productData?.product?.variance?.variance_name.toLowerCase()}.png`}
                                    className="h-full rounded-lg w-full"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">
                                {productData ? 'Benefit' : <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>}
                            </span>
                            {productData ? (
                                [
                                    "Akses penuh ke konten eksklusif yang hanya tersedia untuk pengguna premium.",
                                    "Fitur pencarian lanjutan untuk menemukan apa yang kamu cari lebih cepat dan mudah.",
                                    "Kemampuan untuk mengakses berbagai perangkat tanpa batasan, jadi kamu bisa menikmati layanan di mana saja.",
                                    "Peningkatan kualitas streaming, memberikan pengalaman menonton atau mendengarkan yang lebih jernih dan tajam.",
                                    "Akses lebih cepat ke update atau fitur baru yang belum tersedia untuk pengguna biasa.",
                                    "Pengaturan personalisasi lebih lengkap, memungkinkan pengalaman yang lebih disesuaikan dengan preferensi kamu.",
                                ].map((benefit, idx) => (
                                    <div className="flex gap-2" key={idx}>
                                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                    fill="#03d100"
                                                />
                                            </g>
                                        </svg>
                                        <span>{benefit}</span>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {[...Array(6)].map((_, idx) => (
                                        <div className="flex gap-2" key={idx}>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 w-3/4 animate-pulse rounded"></div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <Card className="mt-5">
                            <Tabs value={activeTab}>
                                <TabsHeader
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-3 w-full"
                                    indicatorProps={{
                                        className: "bg-transparent bg-amber-600 shadow-none rounded-lg",
                                    }}
                                >
                                    {data ? (
                                        data.map(({ label, value }) => (
                                            <Tab
                                                key={value}
                                                value={value}
                                                onClick={() => setActiveTab(value)}
                                                className={activeTab === value ? "text-white font-semibold" : ""}
                                            >
                                                {label}
                                            </Tab>
                                        ))
                                    ) : (
                                        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    )}
                                </TabsHeader>
                                <TabsBody>
                                    {data ? (
                                        data.map(({ value, desc }) => (
                                            <TabPanel key={value} value={value}>
                                                {desc}
                                            </TabPanel>
                                        ))
                                    ) : (
                                        <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
                                    )}
                                </TabsBody>
                            </Tabs>
                        </Card>
                    </div>

                    {/* Kanan */}
                    <div className="flex-[1] flex flex-col gap-3">
                        <div className="border rounded-lg p-5">
                            <span>{productData ? "Skema Harga" : <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>}</span>
                            <div className="flex flex-col gap-2 mt-2">
                                {productData ? (
                                    [
                                        ["Nama Paket", productData?.product?.variance?.variance_name],
                                        ["Harga", "Rp" + productData?.harga.toLocaleString()],
                                        ["Biaya Admin", "Rp6,524"],
                                    ].map(([label, value], idx) => (
                                        <div className="flex justify-between gap-5" key={idx}>
                                            <span>{label}</span>
                                            <span className={idx === 3 ? "font-semibold" : ""}>{value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {[...Array(3)].map((_, idx) => (
                                            <div className="flex justify-between gap-5" key={idx}>
                                                <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                                                <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {promo.length > 0 ? (
                                promo.map((promoItem, idx) => (
                                    <div className="flex gap-3" key={promoItem.id}>
                                        <div className="border rounded-lg p-1 w-full">
                                            <Radio
                                                name="type"
                                                label={promoItem.title}
                                                color="amber"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
                            )}
                        </div>

                        <Button className="bg-amber-500 w-full" onClick={toCheckout}>
                            Pesan
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Detail;
