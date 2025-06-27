"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getResource,
  getResourceUrl
} from "../../../utils/Fetch";

import PopularProducts from "./popular-products";

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
    <header className="bg-[#232323] top-0 lg:mb-0 mb-0 lg:mt-[-20px] mt-0">
      <div>
        <Carousel>
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative">
                  <div className="lg:h-[400px] h-[150px] bg-gray-300 animate-pulse rounded w-full mb-2"></div>
                </div>
              ))
          ) : (
            banner.map((data, index) => (
              <div key={index} className="relative">
                <Image width={1080} height={400} src={data.images} alt={`Slide ${index + 1}`} className="w-full h-full" />
              </div>
            ))
          )}
        </Carousel>
      </div>
      <PopularProducts />

      <div className="flex gap-4 pl-8 items-center pr-8">
        <h1 className="mb-4 text-[#ba0c0c] lg:text-3xl text-xl sm:text-xl lg:text-center text-left text-nowrap font-semibold">
          STREAMING EVENT
        </h1>
        <div className="w-full bg-[#ba0c0c] p-[1px]"></div>
      </div>

      <div className="flex gap-6 lg:pl-8 lg:pr-8 lg:pt-8 lg:pb-8 pl-8 pt-8 pr-8 pb-8 w-full overflow-x-auto hidden-scrollbar">
        {isLoading ? (Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="relative rounded-lg">
              <div className="h-[250px] lg:w-[400px] w-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : promos.map((promo, index) => (
          <div key={index} className="relative rounded-lg">
            <iframe
              className="h-[250px] lg:w-[500px]"
              src={promo.link_video.replace("watch?v=", "embed/")}
              title={promo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="lg:pt-4 pt-4">
              <Typography className="font-semibold text-white sm:text-xl text-sm">{promo.title}</Typography>
              <Typography className="text-gray-600 text-white text-sm sm:text-xl">{promo.deskripsi}</Typography>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Hero;
