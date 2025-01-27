"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { NavbarDetail, Footer } from "@/components";

import Detail from "./partial/Detail"

import { getResource } from "../../../../utils/Fetch";

export default function DetailPage({ params }) {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                try {
                    const response = await getResource(`get_detail_products/${params.id}`); 
                    if (response.prices && response.prices.length > 0) {
                        setProductData(response.prices[0]);
                    } else {  
                        console.warn("No prices found in the response.");  
                    }  
                } catch (err) {
                    setError("An error occurred while fetching data."); 
                }
            };

            fetchData();
        }
    }, [params.id]);

    return (
        <>
            <NavbarDetail />
            <Detail productData={productData} id={params.id} />
            <Footer />
        </>
    );
}
