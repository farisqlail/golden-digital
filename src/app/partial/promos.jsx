"use client";

import Image from "next/image";

import { Carousel, Typography, Button } from "@material-tailwind/react";

export function Promos() {
    return (
        <section className="px-8 py-28">
            <div className="container mx-auto text-center">
                <Typography variant="h2" color="blue-gray" className="mb-4">
                    Promo Produk Kami
                </Typography>
                <Carousel className="rounded-xl">
                    <div className="relative h-full w-full">
                        <iframe
                            className="h-[500px] w-full rounded-lg"
                            src="https://www.youtube.com/embed/qM60-hob0a8"
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="relative h-full w-full">
                        <iframe
                            className="h-[500px] w-full rounded-lg"
                            src="https://www.youtube.com/embed/qM60-hob0a8"
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="relative h-full w-full">
                        <iframe
                            className="h-[500px] w-full rounded-lg"
                            src="https://www.youtube.com/embed/qM60-hob0a8"
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Carousel>

            </div>
        </section>
    );
}

export default Promos;
