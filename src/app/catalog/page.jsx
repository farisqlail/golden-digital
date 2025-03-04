"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getResource } from "../../../utils/Fetch";

import { Typography } from "@material-tailwind/react";

import { NavbarDetail, Footer } from "@/components";
import { ProductCard } from "@/components";

export default function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("variances");

                setProducts(result.variance);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavbarDetail />
            <section className="py-8 px-8 mb-20">
                <div className="container mx-auto sm:mb-20 mb-0 text-center">
                    <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    img={`/logos/${product.variance_name.split(' ')[0].toLowerCase()}.png`}
                                    title={product.variance_name}
                                    code={product.id}
                                />
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                color="white"
                                className="col-span-4 text-center"
                            >
                                Tidak ada produk yang tersedia.
                            </Typography>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
