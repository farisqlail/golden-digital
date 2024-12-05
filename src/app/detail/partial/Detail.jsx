"use client";

import React from "react";
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

export function ContactForm() {
    const [activeTab, setActiveTab] = React.useState("informasi");
    const data = [
        {
            label: "Informasi",
            value: "informasi",
            desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
        },
        {
            label: "Skema Berlangganan",
            value: "skema",
            desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
        },
    ];

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto text-left">
                <Typography variant="h2" color="blue-gray" className="mb-4">
                    Langganan Spotify
                </Typography>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Kiri */}
                    <div className="flex-[3] flex flex-col gap-4">
                        <div className="max-w-[18rem] mx-auto lg:mx-0 mt-5 border-2 rounded-lg p-2">
                            <Image
                                width={1024}
                                height={800}
                                alt="product"
                                src={`/logos/spotify.png`}
                                className="h-full rounded-lg w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">Benefit</span>
                            {[
                                "Login menggunakan akun pribadi, bukan akun orang lain",
                                "Link invitation untuk bergabung grup premium akan dikirim melalui Whatsapp yang terdaftar",
                                "Full akses ke semua lagu, podcast, dan playlist Spotify tanpa batas dan tanpa jeda iklan",
                                "Fitur mode offline, skip lagu, dan blokir musik explicit",
                            ].map((benefit, idx) => (
                                <div className="flex gap-2" key={idx}>
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                fill="#03d100"
                                            />
                                        </g>
                                    </svg>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <Card className="mt-5">
                            <Tabs value={activeTab}>
                                <TabsHeader
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-3 w-full"
                                    indicatorProps={{
                                        className:
                                            "bg-transparent bg-amber-600 shadow-none rounded-lg",
                                    }}
                                >
                                    {data.map(({ label, value }) => (
                                        <Tab
                                            key={value}
                                            value={value}
                                            onClick={() => setActiveTab(value)}
                                            className={activeTab === value ? "text-white font-semibold" : ""}
                                        >
                                            {label}
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    {data.map(({ value, desc }) => (
                                        <TabPanel key={value} value={value}>
                                            {desc}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </Card>
                    </div>

                    {/* Kanan */}
                    <div className="flex-[1] flex flex-col gap-3">
                        <div className="border rounded-lg p-5">
                            <span>Skema Harga</span>
                            <div className="flex flex-col gap-2 mt-2">
                                {[
                                    ["Nama Paket", "Spotify (Bulanan)"],
                                    ["Harga", "Rp141.880"],
                                    ["Biaya Admin", "Rp6.524"],
                                    ["Harga Paket Perbulan", "Rp34.900"],
                                ].map(([label, value], idx) => (
                                    <div className="flex justify-between gap-5" key={idx}>
                                        <span>{label}</span>
                                        <span className={idx === 3 ? "font-semibold" : ""}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {["2 bulan", "3 bulan", "6 bulan", "12 bulan"].map((label, idx) => (
                                <div className="flex gap-3" key={idx}>
                                    <div className="border rounded-lg p-1 w-full">
                                        <Radio name="type" label={label} color="amber" defaultChecked={idx === 0} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="bg-amber-500 w-full">Pesan</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
