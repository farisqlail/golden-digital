"use client";

import React, { useState, useEffect } from "react";

import {
  getResource,
} from "../../../utils/Fetch";

import { ProductCard } from "@/components";
import { Typography } from "@material-tailwind/react";

export function Product() {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResource("get_detail_products");

        const websiteProducts = result.products.filter(
          (product) => product.platform === "Website"
        );
        console.log("Filtered Products:", websiteProducts);

        setProducts(websiteProducts); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-8 px-8">
      <div className="container mx-auto sm:mb-20 mb-0 text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Pilihan
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Produk Kami
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id_produk}
              img="/logos/netflix.png" 
              title={product.detail_produk} 
              desc={`Harga: Rp ${product.harga.toLocaleString()}`} 
            />
          ))
        ) : (
          <Typography variant="h6" color="gray" className="col-span-4 text-center">
            Tidak ada produk yang tersedia.
          </Typography>
        )}
      </div>
    </section>
  );
}

export default Product;
