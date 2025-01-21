"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Typography } from "@material-tailwind/react";

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../utils/Fetch";

export function Payment() {
    const router = useRouter();
    const [dataCheckout, setDataCheckout] = useState(null);

    useEffect(() => {
        const dataCheckout = JSON.parse(localStorage.getItem("dataCheckout"));
        setDataCheckout(dataCheckout);
    }, [])


    const handleSubmit = async () => {
        const data = {
            external_id: dataCheckout?.external_id,
            amount: dataCheckout?.amount,
            id_price: dataCheckout?.id_price,
            id_customer: dataCheckout?.id_customer ? dataCheckout?.id_customer : 0,
            id_promo: dataCheckout?.id_promo ? dataCheckout?.id_promo : 0,
            customer_name: dataCheckout?.customer_name,
            email_customer: dataCheckout?.email_customer,
            phone_customer: dataCheckout?.phone_customer,
            transaction_code: dataCheckout?.transaction_code,
            payment_status: "PENDING",
            payment_method: dataCheckout?.payment_method.nama_payment
        };

        localStorage.setItem("dataPayment", JSON.stringify(data));
        try {
            const response = await postResource('create-invoice', data);

            if (response.success === true) {
                router.push("/success")
                handleOpenSecondModal();
            } else {
                console.error('Invoice URL is missing in the response:', response);
            }
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <section className="py-0 px-4 h-screen text-white">
            <div className="container mx-auto text-center flex flex-col justify-center items-center bg-white">
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] mt-4 border rounded-lg p-3">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-semibold text-lg">Selesaikan Pembayaran anda</span>
                        <div className="mb-4 flex justify-center">
                            <Image
                                width={1024}
                                height={800}
                                alt="subscribe image"
                                src={`/image/success-payment.png`}
                                className="h-full rounded-lg w-2/4"
                            />
                        </div>
                        <div className="mt-4 mb-4 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span>Pilihan Pembayaran</span>
                                <span className="font-semibold">{dataCheckout?.payment_method?.nama_payment}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VA</span>
                                <span className="font-semibold">{dataCheckout?.payment_method?.va}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Atas Nama</span>
                                <span className="font-semibold">{dataCheckout?.payment_method?.name_account}</span>
                            </div>
                        </div>
                        <Button className="bg-[#ba0c0c] w-full mt-3" onClick={handleSubmit}>Saya sudah bayar</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Payment;
