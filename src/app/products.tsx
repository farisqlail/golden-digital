"use client";

import { ProductCard } from "@/components";
import { Typography } from "@material-tailwind/react";

const Products = [
  {
    img: "/image/blog-1.svg",
    title: "Canva",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: "/image/blog2.svg",
    title: "Spotify",
    desc: "Promotional landing page for a  fitness website Summer Campaign. Form development included.",
  },
  {
    img: "/image/blog3.svg",
    title: "Netflix",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: "/image/blog4.svg",
    title: "YouTube",
    desc: "Ecommerce website offering  access to the latest and greatest gadgets and accessories.",
  },
  {
    img: "/image/blog-1.svg",
    title: "WeTV",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: "/image/blog2.svg",
    title: "Capcut Pro",
    desc: "Promotional landing page for a  fitness website Summer Campaign. Form development included.",
  },
  {
    img: "/image/blog3.svg",
    title: "HBO GO",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: "/image/blog4.svg",
    title: "Disney+",
    desc: "Ecommerce website offering  access to the latest and greatest gadgets and accessories.",
  },
];

export function Product() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto mb-20 text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Pilihan
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Produk Kami
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {Products.map((props, idx) => (
          <ProductCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default Product;
