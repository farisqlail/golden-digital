"use client";

import Image from "next/image";

import { Typewriter } from 'react-simple-typewriter';
import { Input, Button, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <header className="bg-white p-8 lg:mb-[150px] mb-0 lg:mt-10 mt-0">
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <div className="flex flex-col">
            <Typography
              variant="h1"
              className="mb-4 lg:text-6xl !leading-tight text-3xl font-bold "
            >
              Tempat Langganan Akun
            </Typography>
            <h1 className="mb-4 lg:text-5xl text-4xl font-bold leading-tight">
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
          <Button className="w-full p-4 md:w-[12rem] bg-amber-400">
            Langganan Di Sini
          </Button>
        </div>
        <Image
          width={800}
          height={300}
          alt="hero"
          src="/image/hero-1.png"
          className="w-full "
        />
      </div>
    </header>
  );
}

export default Hero;
