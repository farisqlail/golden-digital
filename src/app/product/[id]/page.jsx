"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Navbar, Footer } from "@/components";

import Detail from "./partial/Detail"

import { getResource } from "../../../../utils/Fetch";

export default function DetailPage({ params }) {
    const [productData, setProductData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                try {
                    const result = await getResource(`get_detail_products/${params.id}`);
                    console.log(result.price);
                    setProductData(result.price);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            };

            fetchData();
        }
    }, [params.id]);

    return (
        <>
            <Navbar />
            <Detail productData={productData} />
            <Footer />
        </>
    );
}
