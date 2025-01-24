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
        const result = await getResource("get_detail_products");

        const websiteProducts = result.products.filter(
          (product) => product.platform === "Website"
        );

        setProducts(websiteProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-8 px-8 mb-20">
      <div className="container mx-auto sm:mb-20 mb-0 text-center">
        <Typography className="mb-2 font-bold uppercase text-gray-400">
          Pilihan
        </Typography>
        <Typography variant="h2" color="white" className="mb-4">
          Produk Kami
        </Typography>
      </div>

      <div className="lg:p-8 p-0">
        {products.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            navigation
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
            {products.map((product) => (
              <SwiperSlide key={product.id} className="relative rounded-lg overflow-hidden">
                <ProductCard
                  key={product.id_produk}
                  img={`/logos/${product.variance_name.toLowerCase()}.png`}
                  title={product.detail_produk}
                  desc={`Harga: Rp ${product.harga.toLocaleString()}`}
                  code={product.id_produk}
                />
              </SwiperSlide>
            ))}
          </Swiper>

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
    </section>
  );
}

export default Product;
