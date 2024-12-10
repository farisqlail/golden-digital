"use client";

import Image from "next/image";

import { Typewriter } from 'react-simple-typewriter';
import { Input, Button, Typography, Carousel } from "@material-tailwind/react";

function Hero() {
  return (
    <header className="bg-white p-8 lg:mb-0 mb-0 lg:mt-10 mt-0">
      <div className="flex flex-col justify-center items-center h-full gap-10 min-h-[60vh] w-full items-center">
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
                words={['Netflix', 'Disney+', 'HBO Max', 'Spotify']}
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
            className="mb-4 !text-ambber-400 md:pr-16 xl:pr-28"
          >
            Solusi langganan mudah dan terpercaya
          </Typography>
          <Button className="w-full p-4 md:w-[12rem] bg-amber-600">
            Langganan Di Sini
          </Button>
        </div>
        <Carousel className="rounded-xl max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] mx-auto">
          <div className="relative h-full w-full">
            <iframe
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg"
              src="https://www.youtube.com/embed/qM60-hob0a8"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative h-full w-full">
            <iframe
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg"
              src="https://www.youtube.com/embed/qM60-hob0a8"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative h-full w-full">
            <iframe
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg"
              src="https://www.youtube.com/embed/qM60-hob0a8"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Carousel>
      </div>
    </header>
  );
}

export default Hero;
