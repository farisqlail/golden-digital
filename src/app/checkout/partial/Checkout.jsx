"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";

import { Button, Typography } from "@material-tailwind/react";

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../utils/Fetch";

export function Checkout() {
    const router = useRouter();
    const [dataCheckout, setDataCheckout] = useState(null);
    const [listPayment, setListPayment] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [total, setTotal] = useState(0);
    const [uniqueCode, setUniqueCode] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const dataCheckout = JSON.parse(localStorage.getItem("dataPayment"));
        setDataCheckout(dataCheckout);

        const fetchData = async () => {
            try {
                const result = await getResource("list-payments");
                setListPayment(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        const generateUniqueCode = () => {
            const randomCode = Math.floor(Math.random() * 1000); 
            setUniqueCode(randomCode);
        };

        generateUniqueCode();
        fetchData();
    }, [])

    const calculateTotal = () => {
        const uniqueCodeValue = uniqueCode; 
        const baseTotal = dataCheckout?.amount;
        setTotal(baseTotal + uniqueCodeValue); 
    };

    useEffect(() => {
        calculateTotal();
    }, [uniqueCode]);

    const selectPayment = (payment, index) => {
        setSelectedPayment(payment);
        localStorage.setItem("selectedPayment", JSON.stringify(payment)); // Simpan ke localStorage  
    };

    const handleSubmit = async () => {
        const payment = JSON.parse(localStorage.getItem("selectedPayment"))
        const data = {
            external_id: dataCheckout?.external_id,
            amount: total,
            id_price: dataCheckout?.id_price,
            id_customer: dataCheckout?.id_customer ? dataCheckout?.id_customer : 0,
            id_promo: dataCheckout?.id_promo ? dataCheckout?.id_promo : 0,
            customer_name: dataCheckout?.customer_name,
            email_customer: dataCheckout?.email_customer,
            phone_customer: dataCheckout?.phone_customer,
            transaction_code: dataCheckout?.transaction_code,
            payment_status: "PENDING",
            payment_method: payment
        };
        localStorage.setItem("dataCheckout", JSON.stringify(data));
        router.push("/payment")
    };

    return (
        <section className="py-0 px-4">
            <div className="container mx-auto text-center flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] mt-4">
                    <div className="flex w-full">
                        <span className="font-semibold text-xl text-left text-white">Detail Pesanan</span>
                    </div>
                    <div className="border-2 rounded-lg w-full">
                        <div className="border-b-2 pb-2 bg-white">
                            <Image
                                width={1024}
                                height={800}
                                alt="product"
                                src={`/logos/${dataCheckout?.product.toLowerCase()}.png`}
                                className="h-full rounded-lg max-w-full"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-4 text-white p-3">
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-left">{dataCheckout?.product}</span>
                                <span>Rp {dataCheckout?.amount.toLocaleString()} / ({dataCheckout?.duration} Bulan)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full text-white">
                        {listPayment.length > 0 ? (
                            listPayment.map((payment, index) => (
                                <div
                                    key={index}
                                    className={`border-2 rounded-lg mb-2 ${selectedPayment?.id === payment.id ? 'border-[#ba0c0c]' : ''}`}
                                >
                                    <div
                                        className="p-4 cursor-pointer flex justify-between items-center"
                                        onClick={() => selectPayment(payment)}
                                    >
                                        <span>{payment.nama_payment}</span>
                                        <Button
                                            className="mt-2 bg-[#ba0c0c] text-white"
                                            onClick={() => selectPayment(payment)}
                                        >
                                            Pilih
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full border-2 rounded-lg p-4 text-gray-500">
                                Tidak ada metode pembayaran tersedia.
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full text-white">
                        <span className="font-semibold text-xl text-left">Ringkasan Pembayaran</span>
                        <div className="border-b-2 pb-3 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span>Biaya Langganan</span>
                                <span>Rp {dataCheckout?.product_price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Kode Unik Pembayaran</span>
                                <span>Rp {uniqueCode}</span>
                            </div>
                            {dataCheckout?.discountAmount && (
                                <div className="flex justify-between">
                                    <span>Diskon</span>
                                    <span>Rp {dataCheckout?.discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Biaya Transaksi & Tax</span>
                                <span>Rp {dataCheckout?.tax.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-xl font-bold text-[#ba0c0c]">Rp {total.toLocaleString()}</span>
                        </div>
                        <Button className="bg-[#ba0c0c] w-full mt-3" onClick={handleSubmit}>Bayar</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
