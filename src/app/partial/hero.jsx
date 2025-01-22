"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getResource,
} from "../../../utils/Fetch";

import { Typewriter } from 'react-simple-typewriter';
import { Input, Button, Typography, Carousel } from "@material-tailwind/react";

function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [promos, setPromos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResource("promo");
        setPromos(result.promo.slice(0,4) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="bg-[#0b0000] p-8 lg:mb-0 mb-0 lg:mt-10 mt-0">
      <div className="flex flex-col justify-center items-center h-full gap-10 min-h-[60vh] w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Typography
              variant="h1"
              className="mb-4 lg:text-6xl !leading-tight text-3xl font-bold text-center text-[#df0707]"
            >
              Tempat Langganan Akun
            </Typography>
            <h1 className="mb-4 lg:text-5xl text-4xl font-bold leading-tight text-[#df0707]">
              <Typewriter
                words={["Netflix", "Disney+", "HBO Max", "Spotify"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <Button className="w-full p-4 md:w-[12rem] bg-[#ba0c0c]">
            Langganan Di Sini
          </Button>
        </div>

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
