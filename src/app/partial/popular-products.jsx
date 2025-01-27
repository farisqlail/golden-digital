"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

const CLIENTS = [
  "spotify",
  "netflix",
  "hbo",
  "disney",
  "canva",
  "capcut",
  "vidio",
  "viu",
  "vision",
  "we tv",
  "youtube"
];

export function PopularProducts() {
  return (
    <section className="py-4 px-4 lg:py-8 bg-white mb-10 mt-10">
      <div className="container mx-auto grid items-center lg:place-items-center place-items-start">
        <div className="text-center">
          <Typography className="mb-4 text-black lg:text-3xl text-2xl lg:text-center text-left font-semibold">
            Produk Populer Kami
          </Typography>
        </div>
        <div className="w-full overflow-x-auto hidden-scrollbar mt-4">
          <div className="flex items-center gap-6 justify-start lg:justify-center">
            {CLIENTS.map((logo, key) => (
              <Image
                key={key}
                alt={logo}
                width={480}
                height={480}
                src={`/logos/${logo}.png`}
                className="w-40" 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
