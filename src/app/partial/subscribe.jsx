"use client";

import React from "react";
import Image from "next/image";

import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

export function Subscribe() {
  const [active, setActive] = React.useState(3);

  return (
    <section className="py-9 px-8 lg:py-8">
      <div className="container max-w-screen-lg mx-auto">
        <div className="container mx-auto sm:mb-8 mb-0 text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Cara Berlangganan
          </Typography>
        </div>
        <Card color="transparent" shadow={false} className="py-8 lg:flex-row">
          <CardBody className="w-full lg:gap-10 h-full lg:!flex justify-between ">
            <div className="w-full mb-10 lg:mb-0">
              {active === 1 && (
                <div>
                  <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-4 font-bold lg:max-w-xs"
                  >
                    Pilih Produk Layanan
                  </Typography>
                  <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                    Langkah pertama, pilih produk layanan yang paling sesuai dengan kebutuhanmu untuk mulai berlangganan.
                  </Typography>
                </div>
              )}
              {active === 2 && (
                <div>
                  <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-4 font-bold lg:max-w-xs"
                  >
                    Lakukan Pembayaran
                  </Typography>
                  <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                    Setelah itu, lakukan pembayaran dengan metode pembayaran yang sudah kami sediakan, mudah dan praktis!
                  </Typography>
                </div>
              )}
              {active === 3 && (
                <div>
                  <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-4 font-bold lg:max-w-xs"
                  >
                    Admin Akan Mengkonfirmasi Melalui Whatsapp
                  </Typography>
                  <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                    Begitu pembayaran selesai, admin kami akan segera menghubungimu melalui WhatsApp untuk proses konfirmasi, jadi pastikan nomormu aktif, ya!
                  </Typography>
                </div>
              )}
              {active === 4 && (
                <div>
                  <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-4 font-bold lg:max-w-xs"
                  >
                    Akun Siap Digunakan
                  </Typography>
                  <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                    Setelah konfirmasi berhasil, akun kamu akan langsung dikirimkan lewat WhatsApp dan siap untuk digunakan. Selamat menikmati layanan kami!
                  </Typography>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className={`w-10 rounded-lg bg-amber-600 text-white p-2 flex justify-center items-center cursor-pointer ${active === 1 ? "opacity-100" : "opacity-50"}`} onClick={() => setActive(1)}>1</div>
                <div className="w-[1px] h-[36px] bg-blue-gray-100 "></div>
                <div className={`w-10 rounded-lg bg-amber-600 text-white p-2 flex justify-center items-center cursor-pointer ${active === 2 ? "opacity-100" : "opacity-50"}`} onClick={() => setActive(2)}>2</div>
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <div className={`w-10 rounded-lg bg-amber-600 text-white p-2 flex justify-center items-center cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`} onClick={() => setActive(3)}>3</div>
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <div className={`w-10 rounded-lg bg-amber-600 text-white p-2 flex justify-center items-center cursor-pointer ${active === 4 ? "opacity-100" : "opacity-50"}`} onClick={() => setActive(4)}>4</div>
              </div>
            </div>
            <div className="h-full sm:h-[21rem] rounded-lg w-full max-w-[20rem] sm:max-w-[20rem] shrink-0">
              <Image
                width={1024}
                height={800}
                alt="subscribe image"
                src={`/image/subscribe${active}.png`}
                className="h-full rounded-lg w-full"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default Subscribe;
