"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
    getResource,
} from "../../../utils/Fetch";

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
        <section className="px-8 py-28">
            <div className="container mx-auto text-center">
                <Typography variant="h2" color="white" className="mb-4">
                    Promo Menarik
                </Typography>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-screen-lg">
                    {isLoading ? (
                        Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="relative h-[250px] bg-gray-200 animate-pulse rounded-lg"
                                ></div>
                            ))
                    ) : (
                        promos.map((promo) => (
                            <div key={promo.id} className="relative rounded-lg overflow-hidden">
                                {promo.image ? (
                                    <Image
                                        src={`${promo.image}`} 
                                        alt={promo.title}
                                        width={300}   
                                        height={250}
                                        className="object-cover h-[250px] w-full"
                                    />
                                ) : (
                                    <div className="h-[250px] bg-gray-300 flex items-center justify-center">
                                        <Typography variant="h6" className="text-gray-500">
                                            Tidak ada promo tersedia
                                        </Typography>
                                    </div>
                                )}
                                <div className="p-4">
                                    <Typography variant="h5" className="font-semibold text-white">{promo.title}</Typography>
                                    <Typography variant="body2" className="text-white">{promo.deskripsi}</Typography>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Promos;
