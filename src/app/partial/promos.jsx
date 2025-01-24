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
        <section className="px-8 py-8">
            <div className="container mx-auto text-center">
                <Typography variant="h2" color="white" className="mb-4">
                    Promo Menarik
                </Typography>

                <div className="lg:p-8 p-0">
                    {isLoading ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            navigation
                            pagination={{ clickable: true }}
                            className="mySwiper"
                            style={{ maxHeight: "auto" }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <SwiperSlide key={index} className="relative rounded-lg overflow-hidden">
                                        <div className="h-[250px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                                        <div className="p-4">
                                            <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    ) : (
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            navigation
                            className="mySwiper"
                            style={{ maxHeight: "auto" }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {promos.map((promo) => (
                                <SwiperSlide key={promo.id} className="relative rounded-lg overflow-hidden">
                                    <Image
                                        src={`${promo.image}`}
                                        alt={promo.title}
                                        width={300}
                                        height={250}
                                        className="object-cover h-[250px] w-full"
                                    />
                                    <div className="p-4">
                                        <Typography variant="h5" className="font-semibold text-white">{promo.title}</Typography>
                                        <Typography variant="body2" className="text-gray-600 text-white">{promo.deskripsi}</Typography>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Promos;
