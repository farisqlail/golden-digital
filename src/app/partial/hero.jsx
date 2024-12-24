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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResource("promo");
        setPromos(result.promo || []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <header className="bg-white p-8 lg:mb-0 mb-0 lg:mt-10 mt-0">
      <div className="flex flex-col justify-center items-center h-full gap-10 min-h-[60vh] w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Typography
              variant="h1"
              className="mb-4 lg:text-6xl !leading-tight text-3xl font-bold text-center"
            >
              Tempat Langganan Akun
            </Typography>
            <h1 className="mb-4 lg:text-5xl text-4xl font-bold leading-tight text-amber-600">
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
          <Typography
            variant="lead"
            className="mb-4 !text-amber-400 md:pr-16 xl:pr-28"
          >
            Solusi langganan mudah dan terpercaya
          </Typography>
          <Button className="w-full p-4 md:w-[12rem] bg-amber-600">
            Langganan Di Sini
          </Button>
        </div>

        <Carousel className="rounded-xl max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] mx-auto">
          {isLoading
            ? Array(3) 
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))
            : promos.map((promo) => {
              const embedUrl = promo.link_video.replace("watch?v=", "embed/");
              return (
                <div key={promo.id} className="relative h-full w-full">
                  <iframe
                    className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg"
                    src={embedUrl}
                    title={promo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
        </Carousel>
      </div>
    </header>
  );
}

export default Hero;
