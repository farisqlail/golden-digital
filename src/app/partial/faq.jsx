"use client";

import React from "react";

import { Typography, Collapse, Button } from "@material-tailwind/react";

export function FAQ() {
    const [open, setOpen] = React.useState(0);

    const toggleCollapse = (index) => {
        setOpen(open === index ? null : index);
    };

    const faqs = [
        {
            question: "Payment method apa saja yang available di Golden Digital?",
            answer: "Kami menerima pembayaran melalui transfer bank, e-wallet seperti OVO, Gopay, dan DANA.",
        },
        {
            question: "Apakah akun yang dibeli memiliki garansi?",
            answer: "Ya, semua akun yang dibeli memiliki garansi selama 30 hari setelah pembelian.",
        },
        {
            question: "Bagaimana cara menghubungi support jika ada masalah?",
            answer: "Anda dapat menghubungi kami melalui WhatsApp admin kami.",
        },
    ];

    return (
        <section className="px-8 lg:mt-0 mt-20">
            <div className="container mx-auto sm:mb-20 mb-0 text-center">
                <Typography variant="h2" color="white" className="mb-4">
                    Frequently Asked Question (FAQ)
                </Typography>
                <h1
                    className="mb-4 text-white">
                    Berikut ini pertanyaan-pertanyaan yang sering ditanyakan pengguna
                </h1>
            </div>
            <div className="pl-4 pr-4 lg:pl-12 lg:pr-12 flex justify-center w-full">
                <div className="flex flex-col gap-4 w-full max-w-3xl">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b">
                            <div
                                className="flex justify-between items-center w-full cursor-pointer py-4 gap-3"
                                onClick={() => toggleCollapse(index)}
                            >
                                <span className="font-medium text-white">{faq.question}</span>
                                {open == index ? (
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L18 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 12H20M12 4V20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                )}
                            </div>
                            {open === index && (
                                <div className="text-gray-600 transition-all duration-300 ease-in-out overflow-hidden">
                                    <p className="pl-4 pr-4 pb-4 text-white">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
