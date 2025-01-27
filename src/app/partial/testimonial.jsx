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
        <section className="mt-6">
            <div className="flex gap-4 pl-8 items-center pr-8">
                <h1 className="mb-4 text-[#ba0c0c] lg:text-3xl text-2xl lg:text-center text-left text-nowrap font-semibold">
                    Ulasan
                </h1>
                <div className="w-full bg-[#ba0c0c] p-[1px]"></div>
            </div>

            <div className="flex gap-6 lg:pl-8 lg:pr-8 lg:pt-0 lg:pb-8 pl-8 pt-8 pr-8 pb-8 w-full overflow-x-auto hidden-scrollbar">
                {testimonial.length > 0 ? (
                    testimonial.map((item) => (
                        <div key={item.id} className="bg-[#dedede] text-black p-4 rounded-lg shadow-md relative w-[400px]">
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
