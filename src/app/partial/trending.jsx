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

export function Trending() {
    const [isLoading, setIsLoading] = useState(true);
    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("trending");
                setTrending(result.trending);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="lg:mt-8">
            <div className="flex gap-4 pl-8 items-center pr-8">
                <h1 className="mb-4 text-[#ba0c0c] lg:text-3xl text-2xl lg:text-center text-left text-nowrap font-semibold">
                    TRENDING SAAT INI
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
                    )
                    ) : trending.map((item, index) => (
                        <div key={item.id} className="carousel-item">
                            <h1 className="index">{index + 1}</h1>
                            <Image
                                src={`${item.image}`}
                                alt={item.title}
                                width={1080}
                                height={600}
                                className="object-cover h-full"
                            />
                        </div>
                    )
                    )}
            </div>
        </section >
    );
}

export default Trending;
