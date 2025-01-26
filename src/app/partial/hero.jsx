"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getResource,
  getResourceUrl
} from "../../../utils/Fetch";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Input, Button, Typography, Carousel } from "@material-tailwind/react";

function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [promos, setPromos] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [banner, setBanner] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResource("promo");
        const resultBanner = await getResource("banner");
        // const response = await getResourceUrl('https://api.themoviedb.org/3/movie/popular?api_key=07b5021a6c01561da27b2a25c2471dbc');
        // console.log("tt", response);
        // setMovies(response.results);


        setPromos(result.promo.slice(0, 4) || []);
        setBanner(resultBanner.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="bg-[#0b0000] lg:mb-0 mb-0 lg:mt-0 mt-0">
      <div className="relative">
        <Carousel>
          {banner.map((data, index) => (
            <div key={index} className="relative">
              <img src={data.images} alt={`Slide ${index + 1}`} className="w-full h-full" />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="p-8">
        {isLoading ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
            style={{ maxHeight: "250px" }}
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
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index} className="relative rounded-lg overflow-hidden">
                  <div className="h-[250px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
            style={{ maxHeight: "250px" }}
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
            {promos.map((promo) => (
              <SwiperSlide key={promo.id} className="relative rounded-lg overflow-hidden">
                <iframe
                  className="h-[250px] w-full"
                  src={promo.link_video.replace("watch?v=", "embed/")}
                  title={promo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="p-4">
                  <Typography variant="h5" className="font-semibold text-white">{promo.title}</Typography>
                  <Typography variant="body2" className="text-gray-600 text-white">{promo.deskripsi}</Typography>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </header>
  );
}

export default Hero;
