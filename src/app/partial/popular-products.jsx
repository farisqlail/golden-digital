"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

const CLIENTS = [
  "spotify",
  "netflix",
  "hbo",
  "disney+",
];

export function PopularProducts() {
  return (
    <section className="py-4 px-4 lg:py-8 bg-gray-300 mb-10 mt-10">
      <div className="container mx-auto grid items-center place-items-center">
        <div className="text-center">
          <Typography variant="h6" className="mb-4 uppercase !text-gray-800">
            Golden Digital
          </Typography>
          <Typography variant="h2" color="black" className="mb-4">
            Produk Populer Kami
          </Typography>
        </div>
        <div className="w-full overflow-x-auto mt-4">
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
