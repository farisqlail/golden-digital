"use client";

import React, { useEffect, useState } from "react";

import {
    getResource,
} from "../../../utils/Fetch";

import { Typography, Collapse, Button } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function Testimonial() {
    const [testimonial, setTestimonial] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("testimonial");
                const sortedTestimonials = result.testimonial.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setTestimonial(sortedTestimonials);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <section className="py-4 px-4 lg:px-20 lg:mt-0 lg:mt-20 mt-6 lg:mb-20 mb-6">
            <div className="container mx-auto sm:mb-20 mb-0 text-center">
                <Typography variant="h2" color="white" className="mb-4">
                    Testimonal Dari Pengguna Kami
                </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[500px]">
                {testimonial.length > 0 ? (
                    testimonial.map((item) => (
                        <div key={item.id} className="bg-[#dedede] text-black p-4 rounded-lg shadow-md relative">
                            <div className="flex gap-3 items-center">
                                <div>
                                    <UserCircleIcon className="w-8 h-8 text-black" />
                                </div>
                                <Typography variant="h5" className="font-semibold text-black">{item.name}</Typography>
                            </div>
                            <Typography variant="paragraph" className="mt-2 text-black">{item.deskripsi}</Typography>
                        </div>
                    ))
                ) : (
                    <Typography variant="paragraph" className="text-black">Tidak ada testimonial tersedia.</Typography>
                )}
            </div>
        </section>
    );
}

export default Testimonial;
