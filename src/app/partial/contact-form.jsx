"use client";

import {
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

export function ContactForm() {
  return (
    <section className="px-8 py-16">
      <div className="container mx-auto sm:mb-20 mb-0 text-center">
        <Typography variant="h2" color="white" className="mb-4">
          Kontak
        </Typography>
      </div>
      <div>
        <Card className="container mx-auto border border-[#564d4d] shadow-lg bg-[#564d4d]">
          <CardBody className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-400">
              <h4 className="text-black mb-2 font-semibold">Kontak</h4>
              <span className="mx-auto mb-8 text-base text-white">
                Tim kami akan menghubungi Anda dalam waktu 24 jam
              </span>
              <div className="flex gap-5 mt-3">
                <PhoneIcon className="h-6 w-6 text-white" />
                <h6 className="text-white mb-2">+62(424) 535 3523</h6>
              </div>
              <div className="flex my-2 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-white" />
                <h6 className="text-white mb-2">hello@mail.com</h6>
              </div>
              <div className="flex items-center gap-5">
                <i className="fa-brands fa-facebook text-lg" />
                <i className="fa-brands fa-instagram text-lg" />
                <i className="fa-brands fa-github text-lg" />
              </div>
            </div>
            <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
              <h4 className="text-white mb-2 font-bold">Tentang Kami</h4>
              <p className="text-white">
                Teman Layanan Digital hanya di Teman Gabutmu. Layanan digital bebas
                kendala, harga murah, account dijamin original.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default ContactForm;
