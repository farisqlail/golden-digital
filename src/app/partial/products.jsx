"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getResource,
} from "../../../utils/Fetch";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { ProductCard } from "@/components";
import { Typography } from "@material-tailwind/react";

export function Product() {
  const router = useRouter();
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
    <section className="mt-6">
      <div className="flex gap-4 pl-8 items-center pr-8">
        <h1 className="mb-4 text-[#ba0c0c] lg:text-3xl text-2xl lg:text-center text-left text-nowrap font-semibold">
          PRODUK HARI INI
        </h1>
        <div className="w-full bg-[#ba0c0c] p-[1px]"></div>
      </div>

      <div className="flex gap-6 lg:pl-8 lg:pr-8 lg:pt-0 lg:pb-8 pl-8 pt-8 pr-8 pb-8 w-full overflow-x-auto hidden-scrollbar">
        {products.length > 0 ?
          products.map((product) => (
            <div key={product.id} className="carousel-item-product">
              <ProductCard
                key={product.id}
                img={`/logos/${product.variance_name.toLowerCase()}.png`}
                title={product.variance_name}
                code={product.id}
              />
            </div>
          )) : (
            <Typography
              variant="h6"
              color="white"
              className="col-span-4 text-center"
            >
              Tidak ada produk yang tersedia.
            </Typography>
          )}
      </div>
    </section>
  );
}

export default Product;
