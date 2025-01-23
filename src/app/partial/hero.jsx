"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getResource,
} from "../../../utils/Fetch";

import { Input, Button, Typography, Carousel } from "@material-tailwind/react";

function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [promos, setPromos] = useState([]);
  const [error, setError] = useState(null);
  const [banner, setBanner] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResource("promo");
        const resultBanner = await getResource("banner");

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

      <div className="flex flex-col justify-center items-center h-full gap-10 min-h-[60vh] w-full p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-screen-lg">
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative h-[250px] bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))
          ) : (
            promos.map((promo) => (
              <div key={promo.id} className="relative rounded-lg overflow-hidden">
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
              </div>
            ))
          )}
        </div>
      </div>
    </header>
  );
}

export default Hero;
