"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
    getResource,
} from "../../../utils/Fetch";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Carousel, Typography, Button } from "@material-tailwind/react";

export function Promos() {
    const [isLoading, setIsLoading] = useState(true);
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("promo");
                const filteredPromos = result.promo.filter(promo => promo.image !== null);
                setPromos(filteredPromos.slice(0, 8) || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {promos.length > 0 && (
                <section className="mt-6">
                    <div className="flex gap-4 pl-8 items-center pr-8">
                        <h1 className="mb-4 text-[#ba0c0c] lg:text-3xl text-2xl lg:text-center text-left text-nowrap font-semibold">
                            Produk Hari Ini
                        </h1>
                        <div className="w-full bg-[#ba0c0c] p-[1px]"></div>
                    </div>

                    <div className="flex gap-6 lg:pl-8 lg:pr-8 lg:pt-16 lg:pb-16 pl-8 pt-8 pr-8 pb-8 w-full overflow-x-auto hidden-scrollbar">
                        {isLoading ? Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index} className="h-full flex items-center w-full">
                                    <div className="h-[250px] w-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
                                    <div className="p-4">
                                        <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                                    </div>
                                </div>
                            )) : promos.map((promo) => (
                                <div key={promo.id} className="carousel-item-product">
                                    <Image
                                        src={`${promo.image}`}
                                        alt={promo.title}
                                        width={300}
                                        height={250}
                                        className="object-cover h-[250px] w-full"
                                    />
                                    <div className="pt-4 text-left">
                                        <Typography variant="h5" className="font-semibold text-white">{promo.title}</Typography>
                                        <Typography variant="body2" className="text-gray-500">{promo.deskripsi}</Typography>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}
        </>
    );
}

export default Promos;
